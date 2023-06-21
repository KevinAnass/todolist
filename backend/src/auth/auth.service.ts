import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dtos/auth.dto';
import * as argo from 'argon2';
import { sendPasswordResetCode } from 'utils/email/email.utils';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async SignUp(auth: AuthDto) {
    try {
      const hash = await argo.hash(auth.password);
      const user = await this.prisma.user.create({
        data: {
          email: auth.email,
          hash,
        },
      });

      return await this.SignInToken(user.id, user.email);
    } catch (error) {
      if (error.constructor.name === 'PrismaClientKnownRequestError')
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      throw error;
    }
  }

  async SignIn(auth: AuthDto) {
    //test
    await sendPasswordResetCode('anass.nasim41@gmail.com', 'code');
    const user = await this.prisma.user.findUnique({
      where: {
        email: auth.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials is wrong');

    const rightPass = await argo.verify(user.hash, auth.password);
    if (!rightPass) throw new ForbiddenException('Wrong password');
    return await this.SignInToken(user.id, user.email);
  }

  async IsEmailExist(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new ForbiddenException('no email with this credentials');
    return await this.SignInToken(user.id, user.email, '10m');
  }

  async ResetPassword(auth: AuthDto) {
    const hash = await argo.hash(auth.password);
    const user = await this.prisma.user.update({
      where: {
        email: auth.email,
      },
      data: {
        email: auth.email,
        hash,
      },
    });
    if (!user) throw new ForbiddenException('no email with this credentials');
    return await this.SignInToken(user.id, user.email, '10m');
  }

  async SignInToken(
    id: number,
    email: string,
    expiresIn = '100 days',
  ): Promise<{ access_token }> {
    const payload = {
      sub: id,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: expiresIn,
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
