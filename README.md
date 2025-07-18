# TaskManager

A modern, full-stack task management application built with React, Node.js, and Express.

## Features

- ✨ Beautiful, responsive UI
- 📝 Create, edit, and delete tasks
- 🏷️ Task categories and priorities
- 📅 Due date management
- ✅ Mark tasks as complete
- 🔍 Search and filter tasks
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: In-memory storage (easily extensible to MongoDB/PostgreSQL)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the React frontend
- `npm run build` - Build the frontend for production
- `npm start` - Start the production server

## Project Structure

```
TaskManager/
├── client/          # React frontend
├── server/          # Node.js backend
├── package.json     # Root package.json
└── README.md        # This file
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License # TaskManager
