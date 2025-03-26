import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UserService } from "src/application/user.service";
import { CreateUserDTO } from "../dtos/createUserDTO";

@Controller("users")
@ApiTags("Users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiResponse({ status: 200, description: 'Usuario agregado' })
    @ApiResponse({ status: 404, description: 'No se pudo agregar el usuario' })
    @ApiBody({ type: CreateUserDTO })
    async sendUser(@Body() user: CreateUserDTO): Promise<void> {
        await this.userService.saveUser(user);
    }
}