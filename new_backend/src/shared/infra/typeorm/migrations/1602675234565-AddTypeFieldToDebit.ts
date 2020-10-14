import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTypeFieldToDebit1602675234565
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('debits', 'type');
    }
}
