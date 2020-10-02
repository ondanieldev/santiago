import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateTableStudents1597151338369
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'students',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isUnique: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'father_name',
                        type: 'varchar',
                    },
                    {
                        name: 'mother_name',
                        type: 'varchar',
                    },
                    {
                        name: 'birth_date',
                        type: 'date',
                    },
                    {
                        name: 'nacionality',
                        type: 'varchar',
                    },
                    {
                        name: 'birth_city',
                        type: 'varchar',
                    },
                    {
                        name: 'birth_state',
                        type: 'varchar',
                    },
                    {
                        name: 'gender',
                        type: 'enum',
                        enum: ['male', 'female'],
                    },
                    {
                        name: 'race',
                        type: 'enum',
                        enum: [
                            'white',
                            'brown',
                            'black',
                            'indigenous',
                            'yellow',
                        ],
                    },
                    {
                        name: 'ease_relating',
                        type: 'boolean',
                    },
                    {
                        name: 'origin_school',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'health_plan',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'food_alergy',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'medication_alergy',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'health_problem',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'special_necessities',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'birth_certificate_photo',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'vaccine_card_photo',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'health_plan_photo',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'transfer_declaration_photo',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'monthly_declaration_photo',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'school_records_photo',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'students',
            new TableForeignKey({
                name: 'StudentsUserId',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('students', 'StudentsUserId');

        await queryRunner.dropTable('students');
    }
}
