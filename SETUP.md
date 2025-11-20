# Quick Setup Guide

## Step 1: Create PostgreSQL Database

Open PostgreSQL and run:
```sql
CREATE DATABASE bulletin_board;
```

## Step 2: Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file with your database credentials:

   Create a new file named `.env` in the `backend` directory and add:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bulletin_board
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   SECRET_KEY=any-random-string-here
   ```

   Replace the placeholder values with your actual PostgreSQL credentials.

6. Run the backend:
   ```bash
   python app.py
   ```

   Backend will run on http://localhost:5000

## Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm run dev
   ```

   Frontend will run on http://localhost:5173

## Step 4: Access the Application

Open your browser and go to: http://localhost:5173

You should see the Bulletin Board application!

## Troubleshooting

- **Database connection error**: Make sure PostgreSQL is running and credentials in `.env` are correct
- **Port already in use**: Change ports in `app.py` (backend) or `vite.config.js` (frontend)
- **CORS errors**: Ensure backend is running before starting frontend

