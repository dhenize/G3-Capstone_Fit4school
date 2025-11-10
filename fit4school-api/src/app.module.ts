import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 127.0.0.1
      port: 3306,
      username: 'root',
      password: '',
      database: 'cap_fit4school',
      entities: [User, Student],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
