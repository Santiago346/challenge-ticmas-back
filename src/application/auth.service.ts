import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserAccess } from 'src/config/auth/userAccess';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<{ tokenUser: string }>  {
        const user = await this.usersService.getUserByEmail(email);
        if (!user || user.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload: UserAccess = { sub: user.id, username: user.name };
        return {
            tokenUser: await this.jwtService.signAsync(payload),
        };
    }
}
