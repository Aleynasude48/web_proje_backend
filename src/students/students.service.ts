import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './students.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/createStudentDto';
import { UpdateStudentDto } from './dtos/updateStudentDto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentsRepository: Repository<Student>,
  ) {}

  async listAll() {
    return this.studentsRepository.find({
      order: {
        id: 'ASC', // ASC veya DESC
      },
    });
  }

  getOne(id: number) {
    return this.studentsRepository.findOneBy({ id });
  }

  async create(createStudent: CreateStudentDto) {
    const student = this.studentsRepository.create(createStudent);
    return this.studentsRepository.save(student);
  }

  async update(id: number, updateStudent: UpdateStudentDto) {
    const student = await this.getOne(id);
    if (!student) throw new NotFoundException();
    Object.assign(student, updateStudent);
    return this.studentsRepository.save(student);
  }

  async delete(id: number) {
    return this.studentsRepository.delete(id);
  }
}
