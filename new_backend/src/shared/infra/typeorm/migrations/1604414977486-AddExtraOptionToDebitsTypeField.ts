import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddExtraOptionToDebitsTypeField1604414977486
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('debits', 'type');

        await queryRunner.addColumn(
            'debits',
            new TableColumn({
                name: 'type',
                type: 'enum',
                enum: ['enrollment', 'installment', 'extra'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('debits', 'type');

        await queryRunner.addColumn(
            'debits',
            new TableColumn({
                name: 'type',
                type: 'enum',
                enum: ['enrollment', 'installment'],
                default: "'installment'",
            }),
        );
    }
}
