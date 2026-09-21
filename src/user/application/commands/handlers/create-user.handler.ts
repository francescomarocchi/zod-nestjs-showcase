// src/modules/user/application/use-cases/create-user.use-case.ts
import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User, UserEntitySchema } from '../../../domain/entities/user.entity';
import {
  USER_REPOSITORY_PORT,
  UserRepositoryPort
} from '../../../domain/ports/user.repository.port';
import { CreateUserCommand } from '../create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
    // You can also inject a PasswordHasherPort here if you want total abstraction
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    // 1. Business Check: Ensure email is unique
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 2. Hash Password (Simple example or injected service)
    const passwordHash = await this.hashPassword(command.password);

    // 3. Create Domain Entity (Validated runtime via Zod)
    const userEntity = UserEntitySchema.parse({
      id: crypto.randomUUID(),
      email: command.email,
      name: command.name,
      createdAt: new Date(),
    });

    // 4. Save through Repository Port
    const savedUser = await this.userRepository.save(userEntity, passwordHash);

    // 5. Return Domain Entity
    return savedUser;
  }

  private async hashPassword(password: string): Promise<string> {
    // Basic hash abstraction or call your injected PasswordHasher service
    return `hashed_${password}`;
  }
}
