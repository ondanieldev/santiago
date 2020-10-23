import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdatePaymentsAddDischargeDay1603453492899
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'payments',
            new TableColumn({
                name: 'discharge_day',
                type: 'date',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('payments', 'discharge_day');
    }
}
