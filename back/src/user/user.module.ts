import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './user.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: "test",
    signOptions: { expiresIn: '60s' },
  }),
  PassportModule.register({
    defaultStrategy: 'jwt'
  })],
  controllers: [UserController],
  providers: [UserService, AuthGuard, JwtStrategy]
})
export class UserModule { }
