import mysql from 'mysql2/promise';
import { config } from './index';

// Create a MySQL connection pool using the 'sales' connection configuration
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    waitForConnections: true,
    queueLimit: 0,
});

/**
 * Tests the database connection and logs the result.
 * Called on server startup to verify connectivity.
 */
export async function connectDatabase(): Promise<void> {
    try {
        const connection = await pool.getConnection();
        console.log(
            `✅ MySQL connected — connection: "${config.database.connectionName}" | host: ${config.database.host}:${config.database.port} | database: "${config.database.database}"`
        );
        connection.release();
    } catch (error: any) {
        console.error('❌ MySQL connection failed:', error.message);
        // Do NOT crash the server; let it run so routes stay available
    }
}

export default pool;
