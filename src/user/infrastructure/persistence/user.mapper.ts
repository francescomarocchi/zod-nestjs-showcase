import { UserSchema } from "../../../generated/zod";
import { User, UserEntitySchema } from "../../domain/entities/user.entity";
import { User as OrmUser } from "../../../generated/zod";

export class OrmUserSchemaMapper {
    static toDomain(raw: OrmUser): User {
        const parsed: OrmUser = UserSchema.parse(raw);

        return UserEntitySchema.parse({
            id: parsed.id,
            email: parsed.email,
            name: parsed.name,
            createdAt: parsed.createdAt,
        });
    }

    static toPersistence(entity: User, password: string) {
        return UserSchema.parse({
            id: entity.id,
            email: entity.email,
            name: entity.name,
            password,
            createdAt: entity.createdAt,
        });
    }
}
