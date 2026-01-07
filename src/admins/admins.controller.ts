import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { AdminsService } from "./admins.service";

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';
import { CreateAdminDto } from "./dtos/createadmin.dto";

@Controller("admins")
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Role("admin")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.adminsService.findOne(+id);
  }

@Post()
create(@Body() dto: CreateAdminDto) {
  return this.adminsService.create(dto.email, dto.password);
}


  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.adminsService.remove(+id);
  }
}
