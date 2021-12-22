import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { ReadUserPolicyHandler } from '../casl/policy-handler/read-user.policy-handler';
import { CheckPolicies } from '../decorators/check-policies.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(new ReadUserPolicyHandler())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
