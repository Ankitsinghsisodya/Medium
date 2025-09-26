import { Hono } from "hono";
import user from "./routes/user.routes";
import blog from "./routes/blog.routes";
import { Context } from "hono/jsx";
import { verify } from "crypto";
import { authMiddleware } from "./middleware/auth.middleware";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", user);
app.use("/api/v1/blog/*", authMiddleware);
app.route("/api/v1/blog", blog);

export default app;
