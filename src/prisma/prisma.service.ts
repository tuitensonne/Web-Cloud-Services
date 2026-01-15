import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export class PrismaService extends PrismaClient {
    constructor() {
        const pool = new Pool({
            connectionString: "postgresql://last_database_user:Qi3m0tPH6bSlzxNIKQHbhY4DJboGRjvD@dpg-d5kddsemcj7s73d4gmq0-a.singapore-postgres.render.com/last_database?sslmode=require"
        });
        
        const adapter = new PrismaPg(pool);
        
        super({ adapter });

        console.log("Connected to Database");
    }
}
