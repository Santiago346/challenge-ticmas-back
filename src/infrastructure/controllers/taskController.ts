import { TaskService } from "src/application/task.service";
import { CreateTaskDTO } from "../dtos/createTaskDTO";
import { Get, Post, Body, Param, Delete, Controller, Patch, UseGuards, Request } from "@nestjs/common";
import { ApiResponse, ApiBody, ApiParam, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { UserDTO } from "../dtos/userDTO";
import { Task } from "src/domain/task";
import { TaskDTO } from "../dtos/taskDTO";
import { JwtAuthGuard } from "src/config/auth.guard";


@Controller("tasks")
@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get(":id")
    @ApiResponse({ status: 200, description: 'Tareas del usuario', type: [TaskDTO] })
    @ApiResponse({ status: 404, description: 'No se encontro tareas de este usuario' })
    @ApiParam({ name: "id", type: String, description: "ID del usuario" })
    async getTasksUser(@Param("id") id: string, @Request() {user}): Promise<TaskDTO[]> {
        console.log(user)
        return await this.taskService.getTasksByUser(id);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'Tarea agregada' })
    @ApiResponse({ status: 404, description: 'No se pudo agregar la tarea' })
    @ApiBody({ type: CreateTaskDTO })
    async sendTask(@Body() user: CreateTaskDTO): Promise<void> {
        await this.taskService.saveTask(user);
    }

    @Delete(":id")
    @ApiResponse({ status: 200, description: 'Se elimino la tarea' })
    @ApiResponse({ status: 404, description: 'No se pudo eliminar la tarea' })
    @ApiParam({ name: "id", type: String, description: "Eliminar tarea" })
    async deleteTask(@Param("id") id: string): Promise<void> {
        await this.taskService.deleteTask(id)
    }
    
    @Patch(":id")
    @ApiResponse({ status: 200, description: 'Se actualizo la tarea' })
    @ApiResponse({ status: 404, description: 'No se pudo actualizar la tarea' })
    @ApiParam({ name: "id", type: String, description: "ID de la tarea" })
    @ApiParam({name: "status", type: Boolean, description: "Estado de la tarea"})
    async updateTask(@Param("id") id: string) : Promise<void> {
        await this.taskService.changeStatusOk(id, true);
    }
}