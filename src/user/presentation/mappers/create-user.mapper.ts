import { CreateUserCommand } from "src/user/application/commands/create-user.command";
import { CreateUserDto } from "../create-user.dto";

export class CreateUserMapper {
    static toCommand(dto: CreateUserDto): CreateUserCommand {
        return new CreateUserCommand(dto.email, dto.name, dto.password);
    }
}
