import { User } from '../../domain/entities/user.entity';
import { UserResponseDto, UserResponseSchema } from '../user-response.dto';

export class UserMapper {
  static toResponseDto(entity: User): UserResponseDto {
    return UserResponseSchema.parse({
      id: entity.id,
      email: entity.email,
      name: entity.name,
      createdAt: entity.createdAt,
    });
  }
}
