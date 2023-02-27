import { z } from "zod";
import { hashSync } from "bcryptjs";



const createUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().max(100),
    password: z.string().max(120).transform(pass => hashSync(pass, 10)),
    admin: z.boolean(),
    active: z.boolean(),


})

const returnUserSchema = createUserSchema.extend({
    id: z.number()
})

const returnUserSchemaWithoutPassword = returnUserSchema.omit({ password: true });

const updateUserSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    email: z.string().email().max(100).optional(),
    password: z.string().max(120).transform(pass => hashSync(pass, 10)).optional(),
    admin: z.boolean().optional(),
    active: z.boolean().optional(),


})

export {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword,
    updateUserSchema
}