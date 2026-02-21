# Full Stack Integration Guide

Congratulations! You now have a complete full-stack application with a Next.js frontend and an Express.js backend.

## Architecture

- **Frontend**: Next.js (Port 3001)
- **Backend**: Express.js (Port 8080)
- **Database/Auth**: Supabase

## Setup Verification

1. **Backend**: 
   - Verify `backend/.env` exists and contains your Supabase credentials.
   - Verify dependencies are installed: `cd backend && npm install`

2. **Frontend**:
   - Verify `.env.local` exists and contains `NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api`.
   - Verify dependencies are installed: `npm install`

## How to Run locally

You need to run both the frontend and backend servers simultaneously. Open two terminal windows:

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
You should see: `Server is running on http://localhost:8080`

### Terminal 2: Frontend
```bash
# In the root directory
npm run dev
```
You should see: `Ready in ...` on `http://localhost:3001`

## How it Works

1. The frontend dashboard (`http://localhost:3000/dashboard`) loads the prediction form.
2. When you click **Predict Sales**, the frontend sends a POST request to `http://localhost:5000/api/predict`.
3. The Express backend receives the request, validates the input, runs the linear regression model, and returns the prediction.
4. If the backend is unreachable, the frontend will automatically fallback to a local calculation (simulated model) so the user experience is never broken.

## API Endpoints

The backend provides the following endpoints that the frontend now uses:

- `POST /api/predict`: Calculates sales prediction based on TV, Radio, and Newspaper spend.
- `GET /api/predict/model`: Returns the coefficients and performance metrics of the model.

## Troubleshooting

- **CORS Errors**: If you see CORS errors in the browser console, ensure the `FRONTEND_URL` in `backend/.env` matches your frontend URL (default: `http://localhost:3000`).
- **Connection Refused**: Ensure the backend server is running on port 5000.
- **Authentication**: Both frontend and backend are configured to use the same Supabase project.

## Deployment

To deploy this application, you will need to host both parts:
1. **Frontend**: Deploy to Vercel (root directory). Add `NEXT_PUBLIC_BACKEND_URL` environment variable in Vercel.
2. **Backend**: Deploy to a Node.js hosting provider (like Render, Railway, or Heroku) using the `backend` directory. Add all variables from `backend/.env` to the hosting provider.
