# CustomerPulse Setup Guide (Windows / VS Code)

## 1. Install prerequisites
- Install Node.js LTS (Node 20 or newer recommended). Verify in the VS Code terminal with `node -v` and `npm -v`.
- Install MongoDB Community Server locally, or create a MongoDB Atlas database and copy its connection string.
- Open the `CustomerPulse` folder in VS Code.

## 2. Configure the backend
Open a terminal in VS Code and run:

```bash
cd backend
npm install
```

Create `backend/.env` by copying the root `.env.example` values. A local development configuration can look like:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/customerpulse
JWT_SECRET=replace-this-with-a-long-random-secret-at-least-24-characters
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Replace the JWT secret with your own random secret. Do not share or commit the `.env` file. If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas URI.

Start the API:

```bash
npm run dev
```

Expected messages include `MongoDB connected` and `CustomerPulse API listening on port 5000`. Visit `http://localhost:5000/api/health`; you should receive a JSON health response.

## 3. Configure the frontend
Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Register your account and begin by adding customers, then recording purchases.

## 4. Recommended demo sequence
1. Register a business workspace.
2. Add at least 5 sample customers.
3. Record several purchases with different amounts and dates.
4. Open Dashboard and RFM Analysis to see calculated values and segments.
5. Open Campaigns to create a sample retention message.
6. Open Reports and export the RFM results as CSV.

## 5. Troubleshooting
- **MongoDB connection error:** make sure MongoDB service is running, or verify the Atlas URI and network access settings.
- **JWT_SECRET warning:** add a secret at least 24 characters long to `backend/.env`, then restart the backend.
- **Network error in frontend:** confirm backend is running on port 5000 and `CLIENT_URL` matches the frontend origin.
- **CORS error:** check `CLIENT_URL=http://localhost:5173` and restart backend.
- **Module not found:** run `npm install` inside the relevant `backend` or `frontend` directory.
- **Port already in use:** stop the other process or change `PORT` in backend `.env` and set `VITE_API_URL` in `frontend/.env` to match.

## 6. Run backend unit tests
From the `backend` folder run:

```bash
npm test
```
