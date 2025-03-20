import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742477654607 implements MigrationInterface {
    name = 'Migration1742477654607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tasks" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Title" character varying NOT NULL, "Status" boolean NOT NULL, "UserId" uuid NOT NULL, CONSTRAINT "PK_589c709bd92536b13a96d7e2321" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Name" character varying NOT NULL, "Email" character varying NOT NULL, "Password" character varying NOT NULL, CONSTRAINT "PK_58f639b7227c4423b10bdc5483e" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_44a7e4c1196dc22a6a03a49aaeb" FOREIGN KEY ("UserId") REFERENCES "Users"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_44a7e4c1196dc22a6a03a49aaeb"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Tasks"`);
    }

}
