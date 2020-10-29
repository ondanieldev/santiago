import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateDebitsDateFieldsToSetJustOneDate1603992277061
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('debits', 'dicount_limit_date');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'debits',
            new TableColumn({
                name: 'dicount_limit_date',
                type: 'date',
            }),
        );
    }
}
