# Bulletin Board Web Application

A modern, full-stack bulletin board application built with React, Vite, Tailwind CSS, Flask, and PostgreSQL.

## Features

- ✨ Create, read, update, and delete posts
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔄 Real-time updates
- 📱 Mobile-friendly design
- 🚀 Fast development with Vite
- 🗄️ PostgreSQL database for data persistence
- 🔒 RESTful API architecture

## Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework with CSS-first configuration
- **Axios** - HTTP client

### Backend

- **Flask** - Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Relational database
- **Flask-CORS** - Cross-origin resource sharing

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) and npm
- **Python** (v3.8 or higher) and pip
- **PostgreSQL** (v12 or higher)
- **Git** (optional)

## Setup Instructions

### 1. Database Setup

First, create a PostgreSQL database for the application:

```sql
CREATE DATABASE bulletin_board;
```

Note down your database credentials:

- Database name: `bulletin_board` (or your preferred name)
- Username: Your PostgreSQL username
- Password: Your PostgreSQL password
- Host: Usually `localhost`
- Port: Usually `5432`

### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):

   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` directory with your database credentials:

   Create a new file named `.env` in the `backend` directory and add the following:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bulletin_board
   DB_USER=your_username
   DB_PASSWORD=your_password
   SECRET_KEY=your-secret-key-here
   ```

   Replace the placeholder values with your actual PostgreSQL credentials.

5. Run the Flask application:

   ```bash
   python app.py
   ```

   The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Note: This project uses Tailwind CSS v4, which requires `@tailwindcss/postcss` package (already included in dependencies).

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Project Structure

```
Bulletin Board Web Application/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostCard.jsx      # Individual post display component
│   │   │   └── CreatePost.jsx    # Post creation form
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx               # Main application component
│   │   ├── main.jsx             # Application entry point
│   │   └── index.css            # Global styles with Tailwind
│   ├── package.json
│   ├── vite.config.js           # Vite configuration
│   └── postcss.config.js        # PostCSS configuration with Tailwind
│
├── backend/
│   ├── app.py                   # Flask application factory
│   ├── config.py                # Configuration settings
│   ├── models.py                # Database models
│   ├── routes.py                # API routes
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Environment variables (create this file)
│
└── README.md                    # This file
```

## API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /api/posts` - Get all posts
- `GET /api/posts/<id>` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/<id>` - Update a post
- `DELETE /api/posts/<id>` - Delete a post
- `GET /api/health` - Health check endpoint

## Usage

1. **Create a Post**: Click the "Create New Post" button, fill in the title and content, then click "Create Post".

2. **Edit a Post**: Click the "Edit" button on any post, make your changes, and click "Save".

3. **Delete a Post**: Click the "Delete" button on any post and confirm the deletion.

## Development

### Frontend Development

- The frontend uses Vite for fast HMR (Hot Module Replacement)
- Tailwind CSS v4 is configured using `@tailwindcss/postcss` plugin
- CSS imports use `@import "tailwindcss";` syntax (v4)
- API calls are proxied through Vite to the Flask backend

### Backend Development

- Flask runs in debug mode by default
- SQLAlchemy handles database operations
- CORS is enabled for development

## Production Deployment

For production deployment:

1. **Backend**:

   - Set `FLASK_ENV=production` and `FLASK_DEBUG=False`
   - Use a production WSGI server (e.g., Gunicorn)
   - Configure proper CORS origins
   - Use environment variables for sensitive data

2. **Frontend**:
   - Build the production bundle: `npm run build`
   - Serve the `dist` folder with a web server (e.g., Nginx)
   - Update API base URL in environment variables

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure the database exists
- Verify network connectivity

### CORS Errors

- Ensure Flask-CORS is properly configured
- Check that frontend URL is in `CORS_ORIGINS`

### Port Already in Use

- Change the port in `app.py` (backend) or `vite.config.js` (frontend)
- Ensure no other applications are using the ports

### Tailwind CSS Not Styling

- Ensure `@tailwindcss/postcss` is installed: `npm install -D @tailwindcss/postcss`
- Verify `postcss.config.js` uses `@tailwindcss/postcss` plugin
- Check that `src/index.css` uses `@import "tailwindcss";` (v4 syntax)
- Restart the dev server after configuration changes

## License

This project is open source and available for personal and commercial use.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.
"# Bulletin-Web-App" 
