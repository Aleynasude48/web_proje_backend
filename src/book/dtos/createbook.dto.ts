import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  description?: string;

  @IsNumber()
  categoryId: number;
}
