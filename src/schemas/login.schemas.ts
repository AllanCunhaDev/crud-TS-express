import { z } from "zod";
import { hashSync } from "bcryptjs"

const createLoginSchema = z.object({
    email: z.string().email().max(100),
    password: z.string().max(120).transform(pass => hashSync(pass, 10))
})

export { createLoginSchema }

