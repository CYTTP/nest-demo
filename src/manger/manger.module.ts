import { Module } from '@nestjs/common';
import { MangerService } from './manger.service';
import { MangerController } from './manger.controller';
import { Manger } from './entities/manger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Manger])],
  controllers: [MangerController],
  providers: [MangerService],
})
export class MangerModule {}
