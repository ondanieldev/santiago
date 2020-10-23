import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCreatedAndUpdatedDateInAllTables1603453714971
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'profiles',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'persons',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'students',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'relationships',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'grades',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'contracts',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'agreements',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'debits',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'payments',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('payments', 'created_at');
        await queryRunner.dropColumn('debits', 'created_at');
        await queryRunner.dropColumn('agreements', 'created_at');
        await queryRunner.dropColumn('contracts', 'created_at');
        await queryRunner.dropColumn('grades', 'created_at');
        await queryRunner.dropColumn('relationships', 'created_at');
        await queryRunner.dropColumn('students', 'created_at');
        await queryRunner.dropColumn('persons', 'created_at');
        await queryRunner.dropColumn('users', 'created_at');
        await queryRunner.dropColumn('profiles', 'created_at');
    }
}
