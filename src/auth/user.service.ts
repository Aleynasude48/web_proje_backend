import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Book } from '../book/book.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!user) {
      throw new NotFoundException('User bulunamadı');
    }

    return user;
  }

  async addBookToUser(userId: number, bookId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['books'],
    });

    if (!user) {
      throw new NotFoundException('User bulunamadı');
    }

    const book = await this.bookRepo.findOne({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException('Book bulunamadı');
    }

    const exists = user.books.some((b) => b.id === book.id);
    if (exists) {
      throw new BadRequestException('Bu kitap zaten ekli');
    }

    user.books.push(book);
    return this.userRepo.save(user);
  }

  async removeBookFromUser(userId: number, bookId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['books'],
    });

    if (!user) {
      throw new NotFoundException('User bulunamadı');
    }

    user.books = user.books.filter((b) => b.id !== bookId);
    return this.userRepo.save(user);
  }
}
