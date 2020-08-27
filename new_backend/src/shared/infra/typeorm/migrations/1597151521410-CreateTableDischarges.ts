import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateTableDischarges1597151521410
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'discharges',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'payment_id',
                        type: 'uuid',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'discharges',
            new TableForeignKey({
                name: 'DischargesPaymentId',
                columnNames: ['payment_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'payments',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'discharges',
            new TableForeignKey({
                name: 'DischargesUserId',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('discharges', 'DischargesPaymentId');

        await queryRunner.dropForeignKey('discharges', 'DischargesUserId');

        await queryRunner.dropTable('discharges');
    }
}
