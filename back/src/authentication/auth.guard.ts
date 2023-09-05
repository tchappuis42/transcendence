import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TempJwtAuthGuard extends AuthGuard('temp-jwt') { }