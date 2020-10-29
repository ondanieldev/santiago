import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateDateFieldsAndAddDiscountField1603980006875
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'debits',
            'initial_date',
            new TableColumn({
                name: 'dicount_limit_date',
                type: 'date',
            }),
        );

        await queryRunner.changeColumn(
            'debits',
            'final_date',
            new TableColumn({
                name: 'payment_limit_date',
                type: 'date',
            }),
        );

        await queryRunner.addColumn(
            'debits',
            new TableColumn({
                name: 'discount',
                type: 'decimal',
                default: 0,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('debits', 'discount');

        await queryRunner.changeColumn(
            'debits',
            'payment_limit_date',
            new TableColumn({
                name: 'final_date',
                type: 'date',
            }),
        );

        await queryRunner.changeColumn(
            'debits',
            'dicount_limit_date',
            new TableColumn({
                name: 'initial_date',
                type: 'date',
            }),
        );
    }
}
