FlowGrid 🚀

FlowGrid is a modern project management and team collaboration platform built to simplify the way developers and teams organize their work. Inspired by tools like Jira and GoodDay, FlowGrid combines task tracking, Kanban workflows, analytics, and collaboration features into one clean and efficient workspace.

The goal behind FlowGrid is simple: make project management feel faster, cleaner, and more intuitive for teams and developers.

✨ Features
🔐 Authentication & Security
Secure JWT-based authentication
Encrypted password storage using bcrypt
Protected routes and persistent login sessions
📊 Analytics Dashboard
Project and task overview cards
Completion statistics and progress tracking
Recent activity updates
📁 Project Management
Create, edit, and delete projects
Add collaborators to projects
Organize workspaces efficiently
📌 Drag-and-Drop Kanban Board
Interactive task movement between:
Todo
In Progress
Done
Smooth drag-and-drop experience using @dnd-kit
Real-time UI updates with backend synchronization
🔍 Smart Search & Filters
Search tasks instantly
Filter by:
Priority
Status
Project
👤 User Profiles
Personalized productivity stats
Assigned tasks overview
Completion progress tracking
🔔 Toast Notifications
Clean feedback messages for:
Success
Errors
Warnings
Information
🛠️ Tech Stack
Frontend
React.js (Vite)
Tailwind CSS
React Router DOM
Axios
Lucide React Icons
DnD Kit
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
bcryptjs
📂 Project Structure
flowgrid/
│
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Backend Application
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
└── README.md
⚙️ Installation & Setup
Prerequisites

Make sure you have installed:

Node.js (v18 or above)
MongoDB Atlas or Local MongoDB
Git
🚀 Local Development Setup
1. Clone the Repository
git clone git@github.com:sandeepmthf/FlowGrid.git
cd FlowGrid
2. Backend Setup

Move into the server folder:

cd server

Install dependencies:

npm install

Create a .env file inside the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development

Run the backend server:

npm run dev

Backend will run on:

http://localhost:5000
3. Frontend Setup

Open another terminal:

cd client

Install dependencies:

npm install

Run the frontend:

npm run dev

Frontend will run on:

http://localhost:3000
📡 API Routes
Authentication Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get logged-in user
GET	/api/auth/users	Get all users
Project Routes
Method	Endpoint	Description
GET	/api/projects	Get all projects
POST	/api/projects	Create project
PUT	/api/projects/:id	Update project
DELETE	/api/projects/:id	Delete project
Task Routes
Method	Endpoint	Description
GET	/api/tasks	Get tasks
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
🌍 Deployment
Frontend Deployment

You can deploy the frontend easily on:

Vercel
Netlify

Build command:

npm run build

Output directory:

dist
Backend Deployment

Backend can be deployed on:

Render
Railway

Environment variables required:

MONGO_URI=
JWT_SECRET=
PORT=
NODE_ENV=production
🐳 Docker Support

Run the complete project using Docker:

docker-compose up --build

Stop containers:

docker-compose down
🔐 SSH Setup for GitHub

Generate SSH key:

ssh-keygen -t ed25519 -C "your_email@example.com"

Add SSH key to ssh-agent:

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

Copy public key:

cat ~/.ssh/id_ed25519.pub

Add the copied key to:

GitHub SSH Settings

🔮 Future Improvements
Real-time collaboration with Socket.io
Sprint & milestone management
Team notifications
File attachments
Activity logs
Dark mode support
🤝 Contributing

Contributions are welcome.

If you'd like to improve FlowGrid:

Fork the repository
Create a new branch
Make your changes
Submit a pull request
📄 License

This project is licensed under the MIT License.

💡 Final Note

FlowGrid was built as a full-stack MERN application focused on solving real project workflow problems with a clean UI and scalable architecture.