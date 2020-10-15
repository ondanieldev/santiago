import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddReceiptFieldToTheTaPaymentsTable1602760065025
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'payments',
            new TableColumn({
                name: 'receipt',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('payments', 'receipt');
    }
}
