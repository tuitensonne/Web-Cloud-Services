import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      
      url: "postgresql://my_nestjs_app_user:ngDhkbcTQSTxR4IbFLvJckvc3uaUiUZj@dpg-d4n577ili9vc73fbevmg-a.singapore-postgres.render.com/my_nestjs_app?sslmode=require",
      entities: [User],
      synchronize: true, 
      ssl: { rejectUnauthorized: false }, 
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
