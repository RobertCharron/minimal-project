import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { CHECK_POLICIES_KEY } from "../../decorators/check-policies.decorator";
import { AppAbility, CaslAbilityFactory } from "../casl-ability.factory";
import { PolicyHandler } from "../../interfaces/policy-handler.interface";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
        private prisma: PrismaService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const policyHandlers =
            this.reflector.get<PolicyHandler[]>(
                CHECK_POLICIES_KEY,
                context.getHandler(),
            ) || [];
        const req = context.switchToHttp().getRequest<Request>();
        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.createForUser(user);

        let valid: boolean = true;
        const status = policyHandlers.map(async (handler) => {
            const handlerResponse = await this.execPolicyHandler(handler, ability, req);
            valid = handlerResponse;
            return handlerResponse;
        });
        await Promise.all(status);

        return valid;
    }

    private async execPolicyHandler(handler: PolicyHandler, ability: AppAbility, req: Request) {
        if (typeof handler === 'function') {
            return handler(ability, req);
        }
        return await handler.handle(ability, req);
    }
}