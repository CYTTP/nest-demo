import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbController } from './db.controller';
import { Db } from './entities/db.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  //关联数据库
  imports: [TypeOrmModule.forFeature([Db])],
  controllers: [DbController],
  providers: [DbService],
})
export class DbModule {}
