import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from 'bcrypt';

const hashPassword = async (password: string) =>
    await bcrypt.hash(password, 10);

export class addAdmin1678103078468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const password = await hashPassword('System@123#');

        await queryRunner.query(
            `INSERT INTO "user" ("firstName", "lastName","email","phone", "password", "role") VALUES ('admin','admin','admin@yopmail.com',0000000000,'${password}', 'admin');`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user" WHERE email="admin@yopmail.com"`);
    }

}
