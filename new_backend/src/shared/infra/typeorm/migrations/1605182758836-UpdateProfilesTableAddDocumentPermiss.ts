import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateProfilesTableAddDocumentPermiss1605182758836
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'profiles',
            new TableColumn({
                name: 'generate_documents_permiss',
                type: 'boolean',
                default: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('profiles', 'generate_documents_permiss');
    }
}
