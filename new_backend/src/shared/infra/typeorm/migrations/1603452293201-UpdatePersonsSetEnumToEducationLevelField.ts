import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdatePersonsSetEnumToEducationLevelField1603452293201
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'persons',
            'education_level',
            new TableColumn({
                name: 'education_level',
                type: 'enum',
                enum: [
                    'elementary_incompleted',
                    'elementary_completed',
                    'highschool_incompleted',
                    'highschool_completed',
                    'university_incompleted',
                    'university_completed',
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'persons',
            'education_level',
            new TableColumn({
                name: 'education_level',
                type: 'varchar',
            }),
        );
    }
}
