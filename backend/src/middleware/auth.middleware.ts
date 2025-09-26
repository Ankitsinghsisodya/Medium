import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const header: string = c.req.header?.("authorization") || "";
    const token = header.split(' ')[1];
    const response = await verify(token, c.env.JWT_SECRET);
    if (response?.id) await next();
    else {
      c.status(403);
      return c.json({
        error: "authentication",
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({ error });
  }
};
