import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";
import { UserService } from "src/application/user.service";
import { User } from "src/domain/user";
import { CreateUserDTO } from "../dtos/createUser";
import { UserDTO } from "../dtos/userDTO";
import { TaskDTO } from "../dtos/taskDTO";
import { Task } from "src/domain/task";

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

    @Get(":id")
    @ApiResponse({ status: 200, description: 'Usuario obtenido', type: UserDTO })
    @ApiResponse({ status: 404, description: 'No se encontro el usuario' })
    @ApiParam({ name: "id", type: String, description: "ID del usuario" })
    async getUserById(@Param("id") id: string): Promise<UserDTO> {
        return await this.userService.getUserById(id);
    }

    @Get(":id/tasks")
    @ApiResponse({ status: 200, description: 'Tareas del usuario', type: [TaskDTO] })
    @ApiResponse({ status: 404, description: 'No se encontro tareas de este usuario' })
    @ApiParam({ name: "id", type: String, description: "ID del usuario" })
    async getTasksUser(@Param("id") id: string): Promise<TaskDTO[]> {
        return await this.userService.getTasksById(id);
    }
}