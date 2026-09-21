import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { User } from "../../domain/entities/user.entity";
import { User as DbUser } from "../../../generated/zod";
import { OrmUserSchemaMapper } from "./user.mapper";
import { UserRepositoryPort } from "../../domain/ports/user.repository.port";

@Injectable()
export class UserRepository implements UserRepositoryPort {
    constructor(private readonly prisma: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        const user: DbUser = await this.prisma.user.findUnique({
            where: { email },
        });
        return user ? OrmUserSchemaMapper.toDomain(user) : null;
    }

    async save(entity: User, passwordHash: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                name: entity.name,
                password: passwordHash,
                email: entity.email,
                createdAt: entity.createdAt,
            },
        });
    }

    async findByIdOrThrow(id: string): Promise<User> {
        const user: DbUser = await this.prisma.user.findUniqueOrThrow({
            where: { id },
        });
        return OrmUserSchemaMapper.toDomain({ ...user });
    }
}
