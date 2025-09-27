import { Hono } from "hono";
import user from "./routes/user.routes";
import blog from "./routes/blog.routes";
import { cors } from "hono/cors";

import { authMiddleware } from "./middleware/auth.middleware";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    id: string;
  };
}>();

app.use(
  cors({
    origin: ["https://medium-seven-weld.vercel.app", "http://localhost:5173/signup"], // Changed from "*" to specific frontend URL
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", user);
app.use("/api/v1/blog/*", authMiddleware);
app.route("/api/v1/blog", blog);

export default app;
