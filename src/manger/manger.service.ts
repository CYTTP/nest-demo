import { Injectable } from '@nestjs/common';
import { CreateMangerDto, TransforMoneyDto } from './dto/create-manger.dto';
import { UpdateMangerDto } from './dto/update-manger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manger } from './entities/manger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MangerService {
  constructor(
    @InjectRepository(Manger) private readonly money: Repository<Manger>,
  ) {}
  //事务
  async tansforMoney(transforMoneyDto: TransforMoneyDto) {
    try {
      return this.money.manager.transaction(async (manger) => {
        let from = await this.money.findOne({
          where: { id: transforMoneyDto.fromId },
        });
        let to = await this.money.findOne({
          where: { id: transforMoneyDto.toId },
        });
        if (from.money >= transforMoneyDto.money) {
          manger.save(Manger, {
            id: transforMoneyDto.fromId,
            money: from.money - transforMoneyDto.money,
          });
          manger.save(Manger, {
            id: transforMoneyDto.toId,
            money: to.money + transforMoneyDto.money,
          });
          return {
            message: '转账成功',
          };
        } else {
          return {
            message: '余额不足',
          };
        }
      });
    } catch (error) {}

    return true;
  }
  create(createMangerDto: CreateMangerDto) {
    return this.money.save(createMangerDto);
  }

  findAll() {
    return `This action returns all manger`;
  }

  findOne(id: number) {
    // return this.money.findOne(id)

    return `This action returns a #${id} manger`;
  }

  update(id: number, updateMangerDto: UpdateMangerDto) {
    return `This action updates a #${id} manger`;
  }

  remove(id: number) {
    return `This action removes a #${id} manger`;
  }
}
