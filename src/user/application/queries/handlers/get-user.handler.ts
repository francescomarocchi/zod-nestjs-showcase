import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { GetUserQuery } from "../get-user.query";
import { User } from "../../../domain/entities/user.entity";
import {
    USER_REPOSITORY_PORT,
    UserRepositoryPort,
} from "../../../domain/ports/user.repository.port";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(
        @Inject(USER_REPOSITORY_PORT)
        private readonly userRepository: UserRepositoryPort,
    ) {}

    async execute(query: GetUserQuery): Promise<User> {
        const { userId } = query;

        // 1. Fetch user from repository port
        const user = await this.userRepository.findByIdOrThrow(userId);

        // 2. Domain guard: Ensure entity exists
        if (!user) {
            throw new NotFoundException(`User with ID "${userId}" not found`);
        }

        // 3. Return core Domain Entity
        return user;
    }
}
