import { PrismaService } from '@lib/prisma';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, SignupDto } from '../dto';
import { JwtPayload, Tokens } from '../types';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {

  private saltRounds = 12;

  constructor(private prisma: PrismaService, private JwtService: JwtService) {
    // TODO add config service

  }

  async signupLocal(dto: SignupDto): Promise<Tokens> {
    const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        username: dto.username,
        firstname: dto.firstname,
        lastname: dto.lastname,
      }
    }).catch( (error) => {
      if ( error instanceof PrismaClientKnownRequestError){
        if (error.code === 'P2002') {
          throw new ForbiddenException('auth.error.invalidCredentials');
        }
      }
      throw error;
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('auth.error.invalidCredentials');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('auth.error.invalidCredentials');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('auth.error.accessDenied');

    const rtMatches = await bcrypt.verify(user.hashedRt, rt); // TODO maybe wrong way
    if (!rtMatches) throw new ForbiddenException('auth.error.accessDenied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt, this.saltRounds);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash
      },
    });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.JwtService.signAsync(jwtPayload, {
        secret: 'secret', // TODO load from config service
        expiresIn: '15m',
      }),
      this.JwtService.signAsync(jwtPayload, {
        secret: 'rt secret', // TODO load from config service
        expiresIn: '15d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt
    };
  }
}
