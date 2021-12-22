import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto
      }
    });
  }
  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
