import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateTableContracts1597151491158
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'contracts',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        enum: [
                            'underAnalysis',
                            'pendent',
                            'accepted',
                            'active',
                        ],
                    },
                    {
                        name: 'comment',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'student_id',
                        type: 'uuid',
                    },
                    {
                        name: 'grade_id',
                        type: 'uuid',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'contracts',
            new TableForeignKey({
                name: 'ContractsStudentId',
                columnNames: ['student_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'students',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'contracts',
            new TableForeignKey({
                name: 'ContractsGradeId',
                columnNames: ['grade_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'grades',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('contracts', 'ContractsStudentId');

        await queryRunner.dropForeignKey('contracts', 'ContractsGradeId');

        await queryRunner.dropTable('contracts');
    }
}
