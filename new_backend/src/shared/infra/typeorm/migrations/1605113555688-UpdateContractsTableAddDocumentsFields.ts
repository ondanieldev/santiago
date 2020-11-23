import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateContractsTableAddDocumentsFields1605113555688
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('contracts', [
            new TableColumn({
                name: 'contract_document',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'enrollment_form_document',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'checklist_document',
                type: 'varchar',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('contracts', 'checklist_document');
        await queryRunner.dropColumn('contracts', 'enrollment_form_document');
        await queryRunner.dropColumn('contracts', 'contract_document');
    }
}
