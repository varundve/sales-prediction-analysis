import app from './app';
import { config } from './config';
import { connectDatabase } from './config/database';
import { initDb } from './config/initDb';

const PORT = config.port;

async function bootstrap() {
    // 1. Verify DB connectivity and auto-create tables
    await connectDatabase();
    await initDb();

    // 2. Start HTTP server
    const server = app.listen(PORT, () => {
        console.log('=================================');
        console.log(`🚀 Sales Prediction API Server`);
        console.log(`=================================`);
        console.log(`Environment: ${config.nodeEnv}`);
        console.log(`Port: ${PORT}`);
        console.log(`Frontend URL: ${config.cors.origin}`);
        console.log('=================================');
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
        console.log('=================================');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        console.log('SIGINT signal received: closing HTTP server');
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    });

    return server;
}

const server = bootstrap().catch((err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
});

export default server;
