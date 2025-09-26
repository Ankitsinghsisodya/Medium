import { sign } from "hono/jwt";
import { Context } from "hono";
import { getPrisma } from "../lib/prismaFunction";
import { signInInput, signupInput } from "@ankitsingsisodya/medium-blog";
export const signIn = async (c: Context) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    if (!signInInput.safeParse(body).success)
      return c.json({
        message: "input have some issue",
      });
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({
        error: "user not found",
      });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error,
    });
  }
};

export const signUp = async (c: Context) => {
  try {
    const Prisma = getPrisma(c.env.DATABASE_URL);

    const body = await c.req.json();
    if (!signupInput.safeParse(body).success)
      return c.json({
        message: "input are not correct",
      });
      console.log('body', body);
    const user = await Prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error,
    });
  }
};
