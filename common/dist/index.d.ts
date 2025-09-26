import z from "zod";
export declare const signupInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const signInInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.z.core.$strip>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, z.z.core.$strip>;
export type signupInput = z.infer<typeof signupInput>;
export type signInInput = z.infer<typeof signInInput>;
export type createBlogInput = z.infer<typeof createBlogInput>;
export type updateBlogInput = z.infer<typeof updateBlogInput>;
//# sourceMappingURL=index.d.ts.map