# Sales Prediction Backend API

Express.js backend for the Sales Prediction Analysis application.

## Features

- 🚀 **Express.js** REST API
- 🔐 **Supabase Authentication** integration
- 📊 **Linear Regression** sales prediction model
- ✅ **Input Validation** with express-validator
- 🛡️ **Security** with Helmet and CORS
- 📝 **TypeScript** for type safety
- 🔄 **Hot Reload** with Nodemon

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: Supabase
- **Validation**: express-validator
- **Security**: Helmet, CORS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials.

### Running the Server

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health` - Check if API is running

### Prediction
- **POST** `/api/predict` - Generate sales prediction
  ```json
  {
    "tv": 230000,
    "radio": 37000,
    "newspaper": 69000
  }
  ```

- **GET** `/api/predict/model` - Get model information and coefficients

### Authentication
- **POST** `/api/auth/signup` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST** `/api/auth/signin` - Sign in user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST** `/api/auth/signout` - Sign out user

- **GET** `/api/auth/user` - Get current user (requires Bearer token)

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── index.ts     # Main config
│   │   └── supabase.ts  # Supabase client
│   ├── controllers/     # Request handlers
│   │   ├── authController.ts
│   │   └── predictionController.ts
│   ├── middleware/      # Express middleware
│   │   ├── auth.ts      # Authentication middleware
│   │   └── errorHandler.ts
│   ├── routes/          # API routes
│   │   ├── authRoutes.ts
│   │   ├── predictionRoutes.ts
│   │   └── index.ts
│   ├── services/        # Business logic
│   │   └── predictionService.ts
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── .env                 # Environment variables
├── .env.example         # Environment template
├── .gitignore
├── nodemon.json         # Nodemon config
├── package.json
├── tsconfig.json        # TypeScript config
└── README.md
```

## Model Information

The prediction model uses **Linear Regression** with the following coefficients:

- **Intercept**: 2.9389
- **TV Coefficient**: 0.0458
- **Radio Coefficient**: 0.1885
- **Newspaper Coefficient**: -0.001

**Performance Metrics**:
- R² Score: 0.9831 (98.31% accuracy)
- RMSE: 0.77

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `SUPABASE_URL` | Supabase project URL | - |
| `SUPABASE_ANON_KEY` | Supabase anon key | - |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `USD_TO_INR` | Currency conversion rate | 83 |

## Development

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Health check
curl http://localhost:5000/health

# Get model info
curl http://localhost:5000/api/predict/model

# Make a prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"tv": 230000, "radio": 37000, "newspaper": 69000}'
```

## License

ISC
