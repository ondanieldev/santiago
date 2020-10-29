import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDiscountFieldToContractsTable1603981175354
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'contracts',
            new TableColumn({
                name: 'discount',
                type: 'decimal',
                default: 0,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('contracts', 'discount');
    }
}
