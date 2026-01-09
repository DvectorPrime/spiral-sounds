import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "node:path"

export async function getDBConnection(){

    const currentDir = process.cwd()

    const dbPath = path.join(currentDir, "database.db")

    return await open({
        filename: dbPath,
        driver: sqlite3.Database
    })
}