import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateDischargesAddDischargeDayAndReceipt1603452347236
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'discharges',
            new TableColumn({
                name: 'receipt',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('discharges', 'receipt');
    }
}
