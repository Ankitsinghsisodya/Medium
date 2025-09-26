import { Hono } from "hono";
import { createPost, getPost, updatePost } from "../controller/blog.controller";

const blog = new Hono();

blog.post('/blog', createPost);  // createpost
blog.put('/blog', updatePost); // update
blog.get('/blog:id', getPost); // getpost

export default blog;