import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Manger {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  money: number;
}
