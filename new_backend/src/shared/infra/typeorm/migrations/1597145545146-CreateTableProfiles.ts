import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTableProfiles1597145545146
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'profiles',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'new_enrollment_permiss',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'validate_enrollment_permiss',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'pay_debit_permiss',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'discharge_payment_permiss',
                        type: 'boolean',
                        default: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('profiles');
    }
}
