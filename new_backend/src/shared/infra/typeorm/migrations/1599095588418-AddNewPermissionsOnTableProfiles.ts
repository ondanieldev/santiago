import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNewPermissionsOnTableProfiles1599095588418
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('profiles', [
            new TableColumn({
                name: 'crud_profiles_permiss',
                type: 'boolean',
                default: false,
            }),
            new TableColumn({
                name: 'crud_users_permiss',
                type: 'boolean',
                default: false,
            }),
            new TableColumn({
                name: 'crud_grades_permiss',
                type: 'boolean',
                default: false,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('profiles', 'crud_grades_permiss');
        await queryRunner.dropColumn('profiles', 'crud_users_permiss');
        await queryRunner.dropColumn('profiles', 'crud_profiles_permiss');
    }
}
