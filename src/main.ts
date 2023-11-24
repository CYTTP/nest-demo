import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
//访问静态资源
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/img', //设置访问前缀  eg.http://localhost:3000/img/你的资源名称
  });
  app.enableCors()//跨域
  // app.use(
  //   //session 会记录到 浏览器的 cookie 用来区分用户
  //   session({
  //     secret: 'CYTTP',
  //     name: 'CYTTP.session',
  //     rolling: true,
  //     cookie: { maxAge: 99999999 },
  //   }),
  // );
  // //注册 以json格式返回
  // app.useGlobalInterceptors(new Response());
  // app.useGlobalFilters(new HttpFilter());
  // //开启版本控制
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });
  await app.listen(3000);
}
bootstrap();
