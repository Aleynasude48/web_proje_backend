import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { Student } from './students/students.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Admin } from './admins/admin.entity';
import { Book } from './book/book.entity';
import { Category } from './category/category.entity';
import { CategoriesModule } from './category/category.module';
import { AdminsModule } from  './admins/admins.module';
import { BooksModule } from './book/book.module';
import { UserModule } from './auth/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
type: 'sqlite',
      database: 'database.db',
      entities: [Student,User,Admin,Book,Category],
      synchronize: true, // development için
    }),
    StudentsModule,
    AuthModule,
    AdminsModule,
    BooksModule,
    CategoriesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
