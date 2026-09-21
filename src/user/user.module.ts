import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './presentation/controllers/user.controller';
import { CreateUserHandler } from './application/commands/handlers/create-user.handler';
import { GetUserHandler } from './application/queries/handlers/get-user.handler';
import { USER_REPOSITORY_PORT } from './domain/ports/user.repository.port';
import { UserRepository } from './infrastructure/persistence/user.repository';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [GetUserHandler];

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: USER_REPOSITORY_PORT,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
