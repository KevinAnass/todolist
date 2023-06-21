import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthDto } from '../dtos/auth.dto';
import { plainToClass } from 'class-transformer';
import { isUndefinedOrNull } from 'helper/Checks.function';
import jwt_decode from 'jwt-decode';

export const GetAuthDtoFromToken = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const authorizationHeader = request.headers['authorization'];
    const token: string = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : undefined;
    if (isUndefinedOrNull(token)) return null;

    const email = (jwt_decode(token) as any).email;
    if (isUndefinedOrNull(email))
      throw new ForbiddenException('Token is wrong');

    const authDto = plainToClass(AuthDto, request.body);
    const validationErrors = await validate(authDto);

    if (validationErrors.length > 0)
      throw new ForbiddenException('Credentials is wrong');

    const result: AuthDto = {
      email: email,
      password: authDto.password,
    };
    return result;
  },
);
