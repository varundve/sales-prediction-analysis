import pool from './database';

/**
 * Creates the required MySQL tables if they don't already exist.
 * Called once at server startup before any routes are served.
 */
export async function initDb(): Promise<void> {
    try {
        // Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id          VARCHAR(36)  NOT NULL PRIMARY KEY,
                email       VARCHAR(255) NOT NULL UNIQUE,
                name        VARCHAR(255),
                password_hash VARCHAR(255) NOT NULL,
                created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // Predictions table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS predictions (
                id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id         VARCHAR(36),
                tv_inr          DOUBLE NOT NULL DEFAULT 0,
                radio_inr       DOUBLE NOT NULL DEFAULT 0,
                newspaper_inr   DOUBLE NOT NULL DEFAULT 0,
                total_inr       DOUBLE NOT NULL DEFAULT 0,
                prediction_inr  DOUBLE NOT NULL,
                roi             VARCHAR(20),
                created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        console.log('✅ Database tables initialised');
    } catch (error: any) {
        console.error('❌ Failed to initialise database tables:', error.message);
    }
}
