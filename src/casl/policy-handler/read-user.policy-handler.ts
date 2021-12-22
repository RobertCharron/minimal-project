import { subject } from "@casl/ability";
import { User } from "@prisma/client";
import { Request } from "express";
import { Action } from "../../constants/actions";
import { IPolicyHandler } from "../../interfaces/policy-handler.interface";
import { AppAbility } from "../casl-ability.factory";

export class ReadUserPolicyHandler implements IPolicyHandler {
  async handle(ability: AppAbility, req: Request) {
    const userId = req.params.id ?? req.body.id ?? false;
    if (userId) {
      const targetUser: User = {
        id: 1,
        username: "TestUser",
        password: "password"
      };

      console.log("Rules for ability:", ability.rules);
      console.log("Subject:", subject('User', targetUser));
      console.log("Determined to be: ", ability.can(Action.Read, subject('User', targetUser)));
      return ability.can(Action.Read, subject('User', targetUser));
    }
    return ability.can(Action.Read, 'User');
  }
}