import { Injectable } from "@nestjs/common";
import { AbilityClass, AbilityBuilder, ExtractSubjectType } from '@casl/ability';
import { User } from '@prisma/client';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { Action } from "../constants/actions";


export type AppAbility = PrismaAbility<[string, Subjects<{
    User: User;
}>]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        if (!user) {
            user = {
                id: 1,
                username: "TestUser",
                password: "password"
            };
        }
        const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
        const { can, cannot, build } = new AbilityBuilder(AppAbility);

        can(Action.Read, 'User', { id: user.id });

        return build({
            detectSubjectType: item => item.constructor as ExtractSubjectType<AppAbility>
        });
    }
}
