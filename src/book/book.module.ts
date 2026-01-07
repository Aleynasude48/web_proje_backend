import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksService } from "./book.service";
import { BooksController } from "./book.controller";
import { Book } from "./book.entity";
import { Category } from "../category/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
