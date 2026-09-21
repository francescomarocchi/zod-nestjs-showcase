import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email().describe('User email must be a valid email address'),
  name: z.string().min(2).max(50).describe('User name must be between 2 and 50 characters'),
  password: z.string().min(2).max(50).describe('User password must be between 2 and 50 characters'),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

// Creates a class decorated for @nestjs/swagger automatically
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
