import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwt: {
        secret: process.env.JWT_SECRET || 'supersecretkey123',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    },
    currency: {
        usdToInr: Number(process.env.USD_TO_INR) || 83,
    },
    database: {
        connectionName: process.env.DB_CONNECTION_NAME || 'sales',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'varundev',
        database: process.env.DB_NAME || 'db',
    },
    model: {
        // Linear regression coefficients from the trained model
        intercept: 2.9389,
        tvCoef: 0.0458,
        radioCoef: 0.1885,
        newspaperCoef: -0.001,
        // Model performance metrics
        r2: 0.9831,
        rmse: 0.77,
    },
};
