import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserMapper } from "../mappers/user.mapper";
import { UserResponseDto } from "../user-response.dto";
import { GetUserQuery } from "src/user/application/queries/get-user.query";
import { User } from "src/user/domain/entities/user.entity";
import { CreateUserDto } from "../create-user.dto";
import { CreateUserCommand } from "src/user/application/commands/create-user.command";
import { CreateUserMapper } from "../mappers/create-user.mapper";

@ApiTags("Users")
@Controller("users")
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get(":id")
    async getUser(@Param("id") id: string): Promise<UserResponseDto> {
        const query = new GetUserQuery(id);
        const user: User = await this.queryBus.execute<GetUserQuery, User>(
            query,
        );
        return UserMapper.toResponseDto({ ...user });
    }

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserResponseDto> {
        const createUserCommand = CreateUserMapper.toCommand(createUserDto);
        const user: User = await this.commandBus.execute<
            CreateUserCommand,
            User
        >(createUserCommand);
        return UserMapper.toResponseDto(user);
    }
}
