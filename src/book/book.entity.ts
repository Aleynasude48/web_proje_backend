import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,ManyToMany, } from "typeorm";
import { Category } from "../category/category.entity";
import { User } from "../auth/user.entity";
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.books, { eager: true })
  category: Category;
    @ManyToMany(() => User, (user) => user.books)
  users: User[];
}
