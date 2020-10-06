import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPayDayFieldOnDebitsTable1601991439669
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'debits',
            new TableColumn({
                name: 'payday',
                type: 'date',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('debits', 'payday');
    }
}
