import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { AuthService } from "./application/auth.service";
import { AuthController } from "./infrastructure/controllers/authController";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./config/auth/jwt.strategy";


@Module({
    imports: [UserModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: config.getOrThrow("tokenSecret"),
                signOptions: { expiresIn: '36000s' },
            })
        }),
        PassportModule
    ],
    providers: [
        JwtStrategy,
        AuthService
    ],
    controllers: [AuthController]
})

export class AuthModule { }