import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().describe('User email must be a valid email address'),
  name: z.string().min(2).max(50).describe('User name must be between 2 and 50 characters'),
  createdAt: z.date().describe('User creation date'),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

// Creates a class decorated for @nestjs/swagger automatically
export class UserResponseDto extends createZodDto(UserResponseSchema) {}
