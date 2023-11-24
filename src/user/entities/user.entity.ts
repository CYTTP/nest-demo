import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Tags } from './tags.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column()
  desc: string;

  @CreateDateColumn()
  createTime: Date;

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[];
}
