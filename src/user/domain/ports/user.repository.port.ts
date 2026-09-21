// src/modules/user/domain/ports/user.repository.port.ts
import { User } from "../entities/user.entity";

export const USER_REPOSITORY_PORT = Symbol("USER_REPOSITORY_PORT");

export interface UserRepositoryPort {
    findByIdOrThrow(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    save(entity: User, passwordHash: string): Promise<User>;
}
