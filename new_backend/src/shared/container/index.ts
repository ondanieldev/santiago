import { container } from 'tsyringe';

import IAgreementsRepository from '@modules/agreements/repositories/IAgreementsRepository';
import AgreementsRepository from '@modules/agreements/infra/typeorm/repositories/AgreementsRepository';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import ContractsRepository from '@modules/contracts/infra/typeorm/repositories/ContractsRepository';

import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import DebitsRepository from '@modules/debits/infra/typeorm/repositories/DebitsRepository';

import IDischargesRepository from '@modules/discharges/repositories/IDischargesRepository';
import DischargesRepository from '@modules/discharges/infra/typeorm/repositories/DischargesRepository';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import GradesRepository from '@modules/grades/infra/typeorm/repositories/GradesRepository';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import PaymentsRepository from '@modules/payments/infra/typeorm/repositories/PaymentsRepository';

import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import PersonsRepository from '@modules/persons/infra/typeorm/repositories/PersonsRepository';

import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import ProfilesRepository from '@modules/profiles/infra/typeorm/repositories/ProfilesRepository';

import IRelationshipsRepository from '@modules/relationships/repositories/IRelationshipsRepository';
import RelationshipsRepository from '@modules/relationships/infra/typeorm/repositories/RelationshipsRepository';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAgreementsRepository>(
    'AgreementsRepository',
    AgreementsRepository,
);

container.registerSingleton<IContractsRepository>(
    'ContractsRepository',
    ContractsRepository,
);

container.registerSingleton<IDebitsRepository>(
    'DebitsRepository',
    DebitsRepository,
);

container.registerSingleton<IDischargesRepository>(
    'DischargesRepository',
    DischargesRepository,
);

container.registerSingleton<IGradesRepository>(
    'GradesRepository',
    GradesRepository,
);

container.registerSingleton<IPaymentsRepository>(
    'PaymentsRepository',
    PaymentsRepository,
);

container.registerSingleton<IPersonsRepository>(
    'PersonsRepository',
    PersonsRepository,
);

container.registerSingleton<IProfilesRepository>(
    'ProfilesRepository',
    ProfilesRepository,
);

container.registerSingleton<IRelationshipsRepository>(
    'RelationshipsRepository',
    RelationshipsRepository,
);

container.registerSingleton<IStudentsRepository>(
    'StudentsRepository',
    StudentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
