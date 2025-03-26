
import { Body, Controller, Post, HttpCode, HttpStatus} from '@nestjs/common';
import { AuthService } from 'src/application/auth.service';
import { SignInDTO } from '../dtos/signInDTO';

@Controller('authentication')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDTO) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}
