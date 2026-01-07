import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./book.entity";
import { CreateBookDto } from "./dtos/createbook.dto";
import { UpdateBookDto } from "./dtos/updatebook.dto";
 import { Category } from "../category/category.entity";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return this.bookRepo.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException("Kitap bulunamadı");
    return book;
  }

  async create(dto: CreateBookDto) {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) throw new NotFoundException("Kategori bulunamadı");

    const book = this.bookRepo.create({
      title: dto.title,
      author: dto.author,
      description: dto.description,
      category,
    });

    return this.bookRepo.save(book);
  }

  async update(id: number, dto: UpdateBookDto) {
    const book = await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: dto.categoryId },
      });
      if (!category) throw new NotFoundException("Kategori bulunamadı");
      book.category = category;
    }

    Object.assign(book, dto);
    return this.bookRepo.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.bookRepo.remove(book);
  }
}
