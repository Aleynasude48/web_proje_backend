import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from '../auth/user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //  USER + ADMIN → kendi bilgileri ve kitapları
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('user', 'admin')
  @Get('me')
  getMyProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  //  USER + ADMIN → kendi kütüphanesine kitap ekler
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('user', 'admin')
  @Post('me/books/:bookId')
  addBookToMe(
    @Req() req,
    @Param('bookId') bookId: number,
  ) {
    return this.userService.addBookToUser(
      req.user.id,
      Number(bookId),
    );
  }

  //  USER + ADMIN → kendi kütüphanesinden kitap siler
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('user', 'admin')
  @Delete('me/books/:bookId')
  removeBookFromMe(
    @Req() req,
    @Param('bookId') bookId: number,
  ) {
    return this.userService.removeBookFromUser(
      req.user.id,
      Number(bookId),
    );
  }

  //  SADECE ADMIN → herhangi bir user’ın kitaplarını görür
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Role('admin')
//   @Get(':id')
//   getUserByAdmin(@Param('id') id: number) {
//     return this.userService.findOne(Number(id));
//   }
}
