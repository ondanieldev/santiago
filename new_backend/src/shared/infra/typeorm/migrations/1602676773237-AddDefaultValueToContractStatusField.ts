import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDefaultValueToContractStatusField1602676773237
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'contracts',
            'status',
            new TableColumn({
                name: 'status',
                type: 'enum',
                enum: ['underAnalysis', 'pendent', 'accepted', 'active'],
                default: "'underAnalysis'",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'contracts',
            'status',
            new TableColumn({
                name: 'status',
                type: 'enum',
                enum: ['underAnalysis', 'pendent', 'accepted', 'active'],
            }),
        );
    }
}
