import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./infrastructure/models/userModel";
import { UserService } from "./application/user.service";
import { UserRepositoryInTypeOrm } from "./infrastructure/userRepositoryInTypeOrm";
import { UserController } from "./infrastructure/controllers/userController";

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    exports: [UserService],
    providers: [UserService,
        {
            provide: "repository",
            useClass: UserRepositoryInTypeOrm
        }
    ],
    controllers: [UserController],
})
export class UserModule { }