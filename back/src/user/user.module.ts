import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: "test",
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [UserController],
  providers: [UserService, AuthGuard]
})
export class UserModule { }
