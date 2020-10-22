import { injectable, inject } from 'tsyringe';
import { v4 } from 'uuid';

import AppError from '@shared/errors/AppError';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import IReceiptProvider from '@shared/container/providers/ReceiptProvider/models/IReceiptProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
export default class CreatePaymentService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,

        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('StudentsRepository')
        private studentsRepository: IStudentsRepository,

        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,

        @inject('ProfilesRepository')
        private profilesRepository: IProfilesRepository,

        @inject('ReceiptProvider')
        private receiptProvider: IReceiptProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        method,
        debit_id,
        user_id,
    }: Omit<ICreatePaymentDTO, 'amount' | 'receipt'>): Promise<Payment> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Não é possível pagar uma matrícula sem estar logado no sistema!',
            );
        }

        const debit = await this.debitsRepository.findById(debit_id);

        if (!debit) {
            throw new AppError(
                'Não é possível pagar uma matrícula que não existe!',
            );
        }

        if (debit.paid) {
            throw new AppError(
                'Não é possível pagar uma matrícula que já foi paga!',
            );
        }

        if (debit.type !== 'enrollment') {
            throw new AppError(
                'Não é possível pagar um débito que não é do tipo matrícula a partir deste serviço!',
            );
        }

        const contract = await this.contractsRepository.findById(
            debit.contract_id,
        );

        if (!contract) {
            throw new AppError(
                'O contrato referenciado pelo débito não foi encontrado!',
            );
        }

        const receipt = await this.receiptProvider.generate([
            {
                item: debit.description,
                value: debit.value,
            },
        ]);

        const payment = await this.paymentsRepository.create({
            amount: debit.value,
            debit_id,
            method,
            user_id,
            receipt,
        });

        Object.assign(debit, { paid: true, payday: new Date() });

        await this.debitsRepository.save(debit);

        Object.assign(contract, { status: 'active' });

        await this.contractsRepository.save(contract);

        let studentProfile = await this.profilesRepository.findByName('Aluno');

        if (!studentProfile) {
            studentProfile = await this.profilesRepository.create({
                name: 'Aluno',
                crud_grades_permiss: false,
                crud_profiles_permiss: false,
                crud_users_permiss: false,
                discharge_payment_permiss: false,
                new_enrollment_permiss: false,
                pay_debit_permiss: false,
                validate_enrollment_permiss: false,
            });

            this.cacheProvider.invalidate('profiles');
        }

        const studentPassword = v4().slice(0, 6);

        const studentUser = await this.usersRepository.create({
            username: v4(),
            password: await this.hashProvider.generateHash(studentPassword),
            profile_id: studentProfile.id,
        });

        const { student } = contract;

        await this.studentsRepository.updateUser(student.id, studentUser.id);

        let responsibleProfile = await this.profilesRepository.findByName(
            'Responsável',
        );

        if (!responsibleProfile) {
            responsibleProfile = await this.profilesRepository.create({
                name: 'Responsável',
                crud_grades_permiss: false,
                crud_profiles_permiss: false,
                crud_users_permiss: false,
                discharge_payment_permiss: false,
                new_enrollment_permiss: false,
                pay_debit_permiss: false,
                validate_enrollment_permiss: false,
            });

            this.cacheProvider.invalidate('profiles');
        }

        for (const agreement of contract.agreements) {
            const { person } = agreement;

            let responsibleUsername = 'usuário já utilizado no sistema.';

            let responsiblePassword = 'senha já utilizada no sistema.';

            if (!person.user_id) {
                responsibleUsername = v4();

                responsiblePassword = v4().slice(0, 6);

                const responsibleUser = await this.usersRepository.create({
                    username: responsibleUsername,
                    password: await this.hashProvider.generateHash(
                        responsiblePassword,
                    ),
                    profile_id: responsibleProfile.id,
                });

                await this.personsRepository.updateUser(
                    person.id,
                    responsibleUser.id,
                );
            }

            const studentArticleWithNoun =
                student.gender === 'male' ? 'do aluno' : 'da aluna';

            const studentArticle = student.gender === 'male' ? 'do' : 'da';

            await this.mailProvider.sendMail({
                to: {
                    name: person.name,
                    email: person.email,
                },
                subject: '[Santiago] Matrícula Efetivada',
                body: {
                    file: 'notify_active_enrollment.hbs',
                    variables: {
                        responsibleName: person.name,
                        responsibleUsername,
                        responsiblePassword,
                        studentName: student.name,
                        studentUsername: studentUser.username,
                        studentPassword,
                        studentArticleWithNoun,
                        studentArticle,
                    },
                },
            });
        }

        await this.cacheProvider.invalidate('undischarged-payments');

        await this.cacheProvider.invalidate('users');

        return payment;
    }
}
