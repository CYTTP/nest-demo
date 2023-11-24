import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Tags } from './entities/tags.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
  ) {}

  async addTags(params: { tags: string[]; userId: number }) {
    const info = await this.user.findOne({ where: { id: params.userId } });
    const tagList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const element = new Tags();
      element.name = params.tags[i];
      await this.tags.save(element);
      tagList.push(element);
    }
    info.tags = tagList;
    this.user.save(info);
    return true;
  }

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    return this.user.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.user.find({
      relations:['tags'], //查询关联
      where: {
        //模糊查询
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC', //倒序
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
