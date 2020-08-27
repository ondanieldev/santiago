import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateTableRelationships1597151477772
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'relationships',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'kinship',
                        type: 'varchar',
                    },
                    {
                        name: 'person_id',
                        type: 'uuid',
                    },
                    {
                        name: 'student_id',
                        type: 'uuid',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'relationships',
            new TableForeignKey({
                name: 'RelationshipsPersonId',
                columnNames: ['person_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'persons',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'relationships',
            new TableForeignKey({
                name: 'RelationshipsStudentId',
                columnNames: ['student_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'students',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'relationships',
            'RelationshipsStudentId',
        );

        await queryRunner.dropForeignKey(
            'relationships',
            'RelationshipsPersonId',
        );

        await queryRunner.dropTable('relationships');
    }
}
