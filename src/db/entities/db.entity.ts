import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Db {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ select: true }) //过滤密码字段
  password: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createTime: Date;

  @Column({
    //枚举
    type: 'enum',
    enum: [1, 2, 3],
    default: 1,
  })
  isEnum: number;

  @Column('simple-array')
  tags: string[];

  @Column('simple-json')
  json: { name: string; age: number };
}
