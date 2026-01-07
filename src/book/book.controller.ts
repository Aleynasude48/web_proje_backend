import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { BooksService } from "./book.service";
import { CreateBookDto } from "./dtos/createbook.dto";
import { UpdateBookDto } from "./dtos/updatebook.dto";

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Öğrenci + Admin
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.booksService.findOne(+id);
  }

  // SADECE ADMIN
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role("admin")
  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
@Role("admin")
@Patch(":id")
patchUpdate(@Param("id") id: number, @Body() dto: UpdateBookDto) {
  return this.booksService.update(id, dto);
}


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role("admin")
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateBookDto) {
    return this.booksService.update(+id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role("admin")
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.booksService.remove(+id);
  }
}
