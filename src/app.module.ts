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
      
      url: "postgresql://last_database_user:Qi3m0tPH6bSlzxNIKQHbhY4DJboGRjvD@dpg-d5kddsemcj7s73d4gmq0-a.singapore-postgres.render.com/last_database?sslmode=require",
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
