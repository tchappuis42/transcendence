import { Module } from '@nestjs/common';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { TempJwtAuthGuard } from './auth.guard';
import { tempJwtStrategy } from './authentication.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, TempJwtAuthGuard, tempJwtStrategy]
})
export class AuthenticationModule { }
