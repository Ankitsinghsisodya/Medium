import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { Context } from "hono";
import { PrismaClient } from "../generated/prisma";
import { getPrisma } from "../lib/prismaFunction";
export const signIn = async (c: Context) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { email, password } = body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password
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
      jwt
    })

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

    const user = await Prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
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
