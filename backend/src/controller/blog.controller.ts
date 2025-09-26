import { Context } from "hono";
import { getPrisma } from "../lib/prismaFunction";
import {
  createBlogInput,
  updateBlogInput,
} from "@ankitsingsisodya/medium-blog";

export const createPost = async (c: Context) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env.DATABASE_URL);
    if (!createBlogInput.safeParse(body).success)
      return c.json({
        message: "input are not correct",
      });
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("id"),
      },
    });
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    return c.json({
      error,
    });
  }
};
export const updatePost = async (c: Context) => {
  try {
    const body = await c.req.json();
    if (!updateBlogInput.safeParse(body).success)
      return c.json({
        message: "input have some issue",
      });
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    return c.json({
      error,
    });
  }
};
export const getPost = async (c: Context) => {
  try {
    const id = c.req.param("id");

    const prisma = getPrisma(c.env.DATABASE_URL);

    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    return c.json({ blog });
  } catch (error) {
    c.status(500);
    return c.json({
      error,
    });
  }
};

// pagination krna h
export const getAllPost = async (c: Context) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const blog = await prisma.post.findMany();
    return c.json({ blog });
  } catch (error) {
    c.status(500);
    return c.json({
      error,
    });
  }
};
