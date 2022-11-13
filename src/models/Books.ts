import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  uuid!: number

  @Column()
  name!: string

  @Column()
  isbn!: string

  @Column()
  author!: string

  @Column()
  releaseDate!: Date

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

interface PostBook {
  name: string
  isbn: string
  author: string
  releaseDate: Date
}

export { Book, PostBook }