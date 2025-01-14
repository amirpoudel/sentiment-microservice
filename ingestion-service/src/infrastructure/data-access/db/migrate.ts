import {drizzle} from "drizzle-orm/neon-http";
import {migrate} from "drizzle-orm/neon-http/migrator";
import {neon} from "@neondatabase/serverless"

import dotenv from "dotenv";

dotenv.config({
    path:"./env"
});

console.log(process.env.DATABASE_URL)

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);


const main = async () => {
    try {
        await migrate(db,{
            migrationsFolder:__dirname + "/migrations",
        })
        console.log("Migration Success")
    } catch (error) {
        console.error("Migration Error",error)
        process.exit(1)
    }
}


main()
