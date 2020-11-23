import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateStudentsTableToSetBirthStateTo2CaractersLimit1605267126757
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'students',
            'birth_state',
            new TableColumn({
                name: 'birth_state',
                type: 'varchar',
                width: 2,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'students',
            'birth_state',
            new TableColumn({
                name: 'birth_state',
                type: 'varchar',
            }),
        );
    }
}
