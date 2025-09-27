# Medium 

A full-stack blogging platform built with modern web technologies. This project includes both frontend and backend implementations with proper authentication and blog management features.

## Tech Stack

### Frontend

- **React** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Router** - Routing
- **Vite** - Build Tool

### Backend

- **Hono** - Lightweight Web Framework for Cloudflare Workers
- **Prisma** - Database ORM
- **Prisma Accelerate** - Database Connection Pool
- **TypeScript** - Type Safety
- **JWT** - Authentication
- **PostgreSQL** - Database
- **Cloudflare Workers** - Serverless Platform

### Common

- **Zod** - Schema Validation
- **TypeScript** - Shared Types

## API Endpoints

### Authentication

```
POST /api/v1/user/signup
- Create a new user account
- Body: { email: string, password: string, name?: string }
- Returns: { jwt: string }

POST /api/v1/user/signin
- Sign in to existing account
- Body: { email: string, password: string }
- Returns: { jwt: string }
```

### Blog Posts

```
POST /api/v1/blog/blog
- Create a new blog post
- Auth: Required
- Body: { title: string, content: string }
- Returns: { id: string }

GET /api/v1/blog/blog
- Get all blog posts
- Auth: Required
- Returns: { blogs: Blog[] }

GET /api/v1/blog/blog/:id
- Get a specific blog post
- Auth: Required
- Returns: { blog: Blog }

PUT /api/v1/blog/blog
- Update a blog post
- Auth: Required
- Body: { id: string, title: string, content: string }
- Returns: { success: boolean }
```

## Data Models

### User

```typescript
{
  id: string;
  email: string;
  name?: string;
  password: string;
}
```

### Blog

```typescript
{
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    id: string;
    name: string;
  }
}
```

## Features

- User authentication (signup/signin)
- Create and publish blog posts
- View all blog posts
- View individual blog posts
- Author profile views
- Responsive design
- Protected routes
- JWT-based authentication
- Type-safe API calls
- Schema validation

## Project Structure

```
/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── config.ts
│   └── package.json
│
├── backend/            # Hono backend
│   ├── src/
│   │   ├── controller/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│   └── package.json
│
└── common/            # Shared types and validation
    └── src/
        └── index.ts
```

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Ankitsinghsisodya/Medium.git
cd blog
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install common dependencies
cd ../common
npm install
```

3. Set up environment variables:

```bash
# Backend (.env)
DATABASE_URL="your-prisma-accelerate-url"
JWT_SECRET="your-jwt-secret"

# Frontend (.env)
VITE_BACKEND_URL="your-backend-url"
```

4. Start the development servers:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

## Deployment

- Frontend is deployed on Vercel
- Backend is deployed on Cloudflare Workers
- Database is hosted on Prisma Accelerate

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
