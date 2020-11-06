import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNewFieldToDebitsToSetUpOptionalInterest1604596049468
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'debits',
            new TableColumn({
                name: 'apply_interest_rules',
                type: 'boolean',
                default: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('debits', 'apply_interest_rules');
    }
}
