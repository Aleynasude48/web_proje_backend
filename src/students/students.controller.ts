import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos/createStudentDto';
import { UpdateStudentDto } from './dtos/updateStudentDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // list GET /students
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard) // hem giriş hem de rol kontrolü yapar.
  @Role('admin')
  listAll() {
    return this.studentsService.listAll();
  }

  // show GET /students/:id
  @Get(':id')
  @UseGuards(AuthGuard('jwt')) // sadece giriş yapılmış mı diye kontrol eder yani authentication
  show(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.getOne(id);
  }

  // create POST /students
  @Post()
  create(@Body(ValidationPipe) createStudent: CreateStudentDto) {
    return this.studentsService.create(createStudent);
  }

  // update PATCH /students/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateStudent: UpdateStudentDto,
  ) {
    return this.studentsService.update(+id, updateStudent);
  }

  // delete DELETE /students/:id
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.studentsService.delete(+id);
  }
}
