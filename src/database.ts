import { createPool, PoolOptions } from 'mysql2/promise';

export async function connect() {

    const config: PoolOptions = {
        host:  process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT) || 10
    };

    return await createPool(config);

}