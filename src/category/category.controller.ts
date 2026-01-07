import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./category.service";
import { CreateCategoryDto } from "./dtos/createcategory.dto";

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';


@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // user + Admin
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.categoriesService.findOne(+id);
  }

  // SADECE ADMIN
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role("admin")
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role("admin")
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.categoriesService.remove(+id);
  }
}
