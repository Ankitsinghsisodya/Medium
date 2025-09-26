import { Hono, Next } from "hono";
import { createPost, getAllPost, getPost, updatePost } from "../controller/blog.controller";
import { Context } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";

const blogRouter = new Hono();

blogRouter.use("/*", authMiddleware);

blogRouter.post("/blog", createPost); // createpost
blogRouter.put("/blog", updatePost); // update
blogRouter.get("/blog/:id", getPost); // getpost
blogRouter.get("/blog", getAllPost); // getpost

export default blogRouter;
