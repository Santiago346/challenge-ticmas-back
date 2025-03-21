import { Controller, Get, Post, Body, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";
import { UserService } from "src/application/user.service";
import { CreateUserDTO } from "../dtos/createUser";
import { UserDTO } from "../dtos/userDTO";
import { JwtAuthGuard } from "src/config/auth.guard";

@Controller("users")
@ApiTags("Users")
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiResponse({ status: 200, description: 'Usuario agregado' })
    @ApiResponse({ status: 404, description: 'No se pudo agregar el usuario' })
    @ApiBody({ type: CreateUserDTO })
    async sendUser(@Body() user: CreateUserDTO): Promise<void> {
        await this.userService.saveUser(user);
    }

    @Get(":id")
    @ApiResponse({ status: 200, description: 'Usuario obtenido', type: UserDTO })
    @ApiResponse({ status: 404, description: 'No se encontro el usuario' })
    @ApiParam({ name: "id", type: String, description: "ID del usuario" })
    async getUserById(@Param("id") id: string): Promise<UserDTO> {
        return await this.userService.getUserById(id);
    }
}