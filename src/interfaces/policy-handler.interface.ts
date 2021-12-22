import { Request } from 'express';
import { AppAbility } from '../casl/casl-ability.factory';

export interface IPolicyHandler {
    handle(ability: AppAbility, req: Request): Promise<boolean>;
}

type PolicyHandlerCallback = (ability: AppAbility, req: Request) => Promise<boolean>;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;