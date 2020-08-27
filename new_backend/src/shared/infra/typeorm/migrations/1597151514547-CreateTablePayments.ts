import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateTablePayments1597151514547
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'payments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'method',
                        type: 'varchar',
                        enum: [
                            'creditCard',
                            'debitCard',
                            'cash',
                            'check',
                            'deposit',
                            'slip',
                        ],
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                    },
                    {
                        name: 'discharged',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'debit_id',
                        type: 'uuid',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'payments',
            new TableForeignKey({
                name: 'PaymentsDebitId',
                columnNames: ['debit_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'debits',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'payments',
            new TableForeignKey({
                name: 'PaymentsUserId',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('payments', 'PaymentsDebitId');

        await queryRunner.dropForeignKey('payments', 'PaymentsUserId');

        await queryRunner.dropTable('payments');
    }
}
