import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','password','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid().describe("Unique user identifier"),
  email: z.string().email({ message: "Invalid email format" }).describe("Primary email address"),
  name: z.string().min(2, "Name too short").max(50).describe("Full display name"),
  password: z.string().min(8, "Password must be at least 8 chars"),
  createdAt: z.date().describe("Account creation timestamp"),
})

export type User = z.infer<typeof UserSchema>
