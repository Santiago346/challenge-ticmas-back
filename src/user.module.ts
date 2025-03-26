import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./infrastructure/models/userModel";
import { UserService } from "./application/user.service";
import { UserRepositorySQL } from "./infrastructure/userRepositorySQL";
import { UserController } from "./infrastructure/controllers/userController";

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    exports: [UserService],
    providers: [UserService,
        {
            provide: "repository",
            useClass: UserRepositorySQL
        }
    ],
    controllers: [UserController],
})
export class UserModule { }