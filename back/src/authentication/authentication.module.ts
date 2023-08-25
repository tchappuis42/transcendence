import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { TempJwtAuthGuard } from './authentication.guard';
import { tempJwtStrategy } from './authentication.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, TempJwtAuthGuard, tempJwtStrategy]
})
export class AuthenticationModule { }
