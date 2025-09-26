import { sign } from "hono/jwt";
import { Context } from "hono";
import { getPrisma } from "../lib/prismaFunction";
import { signInInput, signupInput } from "@ankitsingsisodya/medium-blog";
export const signIn = async (c: Context) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    if (!signInInput.safeParse(body))
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
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();

    // Properly handle Zod validation
    const validation = signupInput.safeParse(body);
    if (!validation.success) {
      return c.json({
        message: validation.error
      }, 400);
    }

    // Use the validated data
    const user = await prisma.user.create({
      data: {
        email: validation.data.email,
        password: validation.data.password,
        name: validation.data.name || null, // Handle optional name field
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({
      error: "Internal server error"
    }, 500);
  }
};
