import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Book } from '../book/book.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Book]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // başka modüller kullanacaksa
})
export class UserModule {}
