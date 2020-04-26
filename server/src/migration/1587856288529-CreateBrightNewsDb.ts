import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBrightNewsDb1587856288529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createDatabase('brightnews');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
