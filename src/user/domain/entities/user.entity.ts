import { z } from "zod";

export const UserEntitySchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string().min(2).max(50),
    createdAt: z.date(),
});

export type User = z.infer<typeof UserEntitySchema>;

export const renameUser = (user: User, name: string): User =>
    UserEntitySchema.parse({
        ...user,
        name,
    });
