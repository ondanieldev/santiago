import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateTableAgreements1597151498426
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'agreements',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'responsible_type',
                        type: 'enum',
                        enum: ['financial', 'supportive'],
                    },
                    {
                        name: 'person_id',
                        type: 'uuid',
                    },
                    {
                        name: 'contract_id',
                        type: 'uuid',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'agreements',
            new TableForeignKey({
                name: 'AgreementsPersonId',
                columnNames: ['person_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'persons',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'agreements',
            new TableForeignKey({
                name: 'AgreementsContractId',
                columnNames: ['contract_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contracts',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('agreements', 'AgreementsPersonId');

        await queryRunner.dropForeignKey('agreements', 'AgreementsContractId');

        await queryRunner.dropTable('agreements');
    }
}
