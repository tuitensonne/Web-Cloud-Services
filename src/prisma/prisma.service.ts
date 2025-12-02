import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export class PrismaService extends PrismaClient {
    constructor() {
        const pool = new Pool({
            connectionString: "postgresql://my_nestjs_app_user:ngDhkbcTQSTxR4IbFLvJckvc3uaUiUZj@dpg-d4n577ili9vc73fbevmg-a.singapore-postgres.render.com/my_nestjs_app?sslmode=require"
        });
        
        const adapter = new PrismaPg(pool);
        
        super({ adapter });

        console.log("Connected to Database");
    }
}