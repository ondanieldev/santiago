import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateTableDebits1597151505713
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'debits',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                    },
                    {
                        name: 'paid',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'initial_date',
                        type: 'date',
                    },
                    {
                        name: 'final_date',
                        type: 'date',
                    },
                    {
                        name: 'contract_id',
                        type: 'uuid',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'debits',
            new TableForeignKey({
                name: 'DebitsContractId',
                columnNames: ['contract_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contracts',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('debits', 'DebitsContractId');

        await queryRunner.dropTable('debits');
    }
}
