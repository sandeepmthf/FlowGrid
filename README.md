<<<<<<< HEAD
# FlowGrid 🚀

FlowGrid is a modern, collaborative project management and agile workflow tracking platform inspired by Jira and GoodDay Work. It offers visual analytics dashboards, flexible project workspaces, and a drag-and-drop Kanban board designed to streamline development and team coordination.

---

## 🏗️ Tech Stack

# FlowGrid 🚀

FlowGrid is a modern, collaborative project management and agile workflow tracking platform inspired by Jira and GoodDay Work. It offers visual analytics dashboards, flexible project workspaces, and a drag-and-drop Kanban board designed to streamline development and team coordination.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React.js (Vite template)
- **Styling**: Tailwind CSS v4 (native compiler plugin)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios (with authorization token interceptors)
- **Drag-and-Drop**: `@dnd-kit/core` (with pointer sensors & distance constraints)
- **Icons**: Lucide React

### Backend
- **Platform**: Node.js & Express.js
- **Database**: MongoDB Atlas via Mongoose ORM
- **Security**: JWT Authentication (JSON Web Tokens) & Password hashing with `bcryptjs`
- **Configuration**: Dotenv & CORS (Cross-Origin Resource Sharing)

---

## 🌟 Key Features

1. **Secure JWT Authentication**: Account creation, encrypted passwords, session persistency, and protected route guards.
2. **Interactive Analytics Dashboard**: Overview cards tracking project/task counts and completed ratios, project progress trackers, and recent activity logs.
3. **Project Management Container**: CRUD actions for creating, editing, and deleting projects, including collaborator member lists.
4. **Draggable Kanban Board**: Move tasks between `Todo`, `In Progress`, and `Done` columns with live database sync and optimistic state updates.
5. **Advanced Filters & Search**: Search tasks instantly, filter by priority levels (Low, Medium, High), and reset filters on the fly.
6. **Task Settings Modal**: Create and update tasks with inline assignees (project members only) and due-date calendars.
7. **Personalized Profiles**: Detail stats on workloads, active assignments, and completion progress for the logged-in user.
8. **Toast Notifications & Empty States**: Clean, slide-in toasts for operational feedback (success, warning, info, error) and empty states with quick-call actions.

---

## 📂 Project Structure

```text
flowgrid/
 ├── client/                  # Frontend Vite + React Project
 │    ├── src/
 │    │    ├── components/    # Reusable components (Sidebar, Navbar, Modals, Kanban elements)
 │    │    ├── context/       # React Context Providers (Auth, Projects, Tasks, Toasts)
 │    │    ├── layouts/       # Main Dashboard Layout
 │    │    ├── pages/         # Dashboard, Projects, KanbanPage, Profile, Login, Register, NotFound
 │    │    ├── routes/        # Router configuration and ProtectedRoute guards
 │    │    ├── services/      # Axios client configuration
 │    │    ├── App.jsx        # Routing structure mapping
 │    │    └── main.jsx       # Mounting entry point
 │    ├── index.html          # HTML Entry Template
 │    ├── tailwind.config.js  # Tailwind settings
 │    └── vite.config.js      # Vite compilation configurations
 │
+ ├── server/                  # Backend Node + Express Application
 │    ├── config/             # DB configurations (db.js)
 │    ├── controllers/        # Request handlers (auth, projects, tasks)
 │    ├── middleware/         # Security guards (authMiddleware.js)
 │    ├── models/             # Mongoose Schemas (User, Project, Task)
 │    ├── routes/             # Router mappings (auth, projects, tasks)
 │    ├── utils/              # Helper utilities (jwt.js)
 │    ├── app.js              # Express app wiring
 │    └── server.js           # Server startup script
```

---

## 🔧 Installation & Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local instance or MongoDB Atlas Connection String)

### Step 1: Clone and set up backend variables
Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/flowgrid?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_998877
NODE_ENV=development
```

### Step 2: Install dependencies & run backend
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Run backend dev server (localhost:5000)
npm run dev
```

### Step 3: Install dependencies & run frontend
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Run frontend dev server (localhost:3000)
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Endpoints

### Authentication APIs (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user credentials & sign token |
| `GET` | `/api/auth/me` | Private | Retrieve logged-in user profile |
| `GET` | `/api/auth/users` | Private | Get list of all registered workspace users |

### Project APIs (`/api/projects`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Private | Fetch all project containers |
| `POST` | `/api/projects` | Private | Create a new project container |
| `PUT` | `/api/projects/:id` | Private | Update project parameters & collaborators |
| `DELETE` | `/api/projects/:id` | Private | Delete project and cascade-delete tasks |

### Task APIs (`/api/tasks`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Private | Get tasks with optional query filters (`projectId`, `priority`, `status`, `search`) |
| `POST` | `/api/tasks` | Private | Create a task associated with a project |
| `PUT` | `/api/tasks/:id` | Private | Edit task parameters or drag-drop status updates |
| `DELETE` | `/api/tasks/:id` | Private | Remove a task |

---

## 🚀 Production Deployment

### Frontend (Vercel)
Vite projects can be deployed to Vercel instantly:
1. Set the build command to `npm run build`.
2. Set the output directory to `dist`.
3. Add a `vercel.json` file in the `client` directory to handle React Router client-side routing fallbacks if needed.

To deploy the `client/` to Vercel:

1. In the Vercel dashboard, create a new project and import from this GitHub repository.
2. Set the Root directory to `client`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Environment Variables (in Vercel):
  - `VITE_API_URL` = `https://<your-backend-url>/api` (replace with the Render backend URL)
6. Deploy. Vercel will build and publish the static site. The `VITE_API_URL` will be available in the client at runtime.

### Backend (Render / Railway)
1. Add environmental variables `MONGO_URI`, `JWT_SECRET`, `PORT`, and `NODE_ENV` in the platform control panel.
2. Set start command to `node server.js`.

To deploy the `server/` to Render:

1. In Render, create a new "Web Service" and connect the repository.
2. Set the Root Directory to `server`.
3. Build Command: leave empty (no build step) or optionally `npm ci`.
4. Start Command: `node server.js`.
5. Environment Variables (Render dashboard):
  - `MONGO_URI` = `your-production-mongo-uri` (MongoDB Atlas recommended)
  - `JWT_SECRET` = `your_jwt_secret`
  - `PORT` = `10000` (Render assigns ports automatically; can leave blank)
  - `NODE_ENV` = `production`
6. Add a health check path (optional): `/`.

Notes:
- After both services are deployed, set the `VITE_API_URL` in Vercel to point to your Render service (for example `https://flowgrid-backend.onrender.com/api`).
- Ensure CORS on the backend allows your deployed frontend origin (the code currently permits all origins but you may want to restrict it in production by setting `origin: process.env.FRONTEND_URL`).

---

## 🔮 Future Enhancements
- **Real-time Collaboration**: Incorporate WebSockets (Socket.io) to sync card drag operations across teammates in real-time.
- **Milestone Sprints**: Support epic/sprint tags and calendar timeline charts.
- **Activity Stream**: A comprehensive notification history panel highlighting comments and card description edits.

---

## Contributing

Thanks for your interest in contributing to FlowGrid! We welcome bug reports, feature requests, and pull requests.

- Please open an issue first to discuss larger changes or designs.
- Follow the existing code style. Run linters and tests before submitting a PR.
- Keep changes small and focused. Include tests for new behavior when practical.

If you're new to the project, a good first contribution is improving docs, fixing typos, or adding small unit tests.

## Environment Variables

Create a `.env` file inside the `server` directory. Example variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/flowgrid?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_998877
NODE_ENV=development
# Optional: allow-list frontend origin for CORS or production frontend URL
FRONTEND_URL=http://localhost:3000
```

Keep secrets out of version control. Use a secrets manager for production (Render, Railway, Vercel env UI, etc.).

## Available Scripts

From the project root you can run scripts for server and client independently.

Server (in /server):

- npm install
- npm run dev        # start dev server with nodemon (port 5000)
- npm start          # production start (node server.js)

Client (in /client):

- npm install
- npm run dev        # start Vite dev server (port 3000)
- npm run build      # production build into `dist`
- npm run preview    # serve production build locally

## API Examples

Here are a few quick curl examples for common endpoints. Replace <TOKEN> and payload values as needed.

Register a user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"password123"}'
```

Login and receive token:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```

Get tasks (authorized):

```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <TOKEN>"
```

## Troubleshooting

- MongoDB connection errors: ensure `MONGO_URI` is correct and your IP/atlas network rules allow connections.
- CORS issues: confirm `FRONTEND_URL` matches your client origin and the server CORS configuration.
- JWT auth problems: verify `JWT_SECRET` is set and the token hasn't expired. Check server logs for stack traces.

If you hit an error you can't resolve, open an issue and include server logs, the `.env` (without secrets), and steps to reproduce.

## Deployment Notes

- Frontend: build with `npm run build` in `client` and deploy the `dist` directory (Vercel, Netlify, or static hosting). Ensure client environment variables (API base URL) point to your backend.
- Backend: deploy `server` to a Node host (Render, Railway, Heroku). Set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`, `NODE_ENV`) in the platform UI.

Consider using a managed secrets store and enabling backups for your MongoDB instance in production.

## Maintainers / Contact

Maintained by the FlowGrid contributors. For questions or to report bugs, please open an issue in this repository.

## License

This project is licensed under the MIT License — see the LICENSE file for details.

---

Thank you for using FlowGrid! If you'd like, I can also add a `CONTRIBUTING.md`, CI workflow, or a minimal Docker setup next.

## SSH setup & switching remote to SSH
## Deployment (Docker)

This repository includes Dockerfiles for both the frontend and backend and a `docker-compose.yml` to run the full stack locally (includes a MongoDB service).

Prerequisites:
- Docker & Docker Compose installed

Quick start (from project root):

```bash
# Ensure server/.env contains your MONGO_URI, JWT_SECRET, and PORT if desired
cp server/.env.example server/.env  # modify as needed
docker-compose up --build
```

Services:
- frontend: serves the built Vite app behind Nginx on port 3000
- backend: Node/Express app on port 5000
- mongodb: MongoDB instance (data stored in a Docker volume)

Notes:
- The `client/nginx.conf` proxies `/api` requests to the backend (service name `backend`). When deploying to cloud, update the API base URL accordingly.
- For production, use a managed MongoDB (Atlas) and set `MONGO_URI` in `server/.env` instead of the local mongodb service.

Cleaning up:

```bash
docker-compose down -v
```


If you'd rather push and authenticate via SSH (recommended for convenience), follow these steps.

1) Generate an SSH key locally (if you don't have one):

```bash
# Use your email address
ssh-keygen -t ed25519 -C "your_email@example.com"
# or use RSA if ed25519 isn't supported: ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

2) Add the SSH key to the ssh-agent:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

3) Copy the public key and add it to your GitHub account (Settings → SSH and GPG keys):

```bash
cat ~/.ssh/id_ed25519.pub | pbcopy    # macOS: copies to clipboard
```

4) Switch the repository remote to SSH and push:

```bash
cd /Users/apple/Desktop/interns
# set SSH remote (replace if origin exists)
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:sandeepmthf/FlowGrid.git
git branch -M main
git push -u origin main
```

If you prefer to keep the HTTPS remote, you can also configure a credential helper or use a Personal Access Token (PAT) when prompted.
