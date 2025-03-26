import { TaskService } from "src/application/task.service";
import { CreateTaskDTO } from "../dtos/createTaskDTO";
import { Get, Post, Body, Param, Delete, Controller, Patch, UseGuards, Request } from "@nestjs/common";
import { ApiResponse, ApiBody, ApiParam, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { TaskDTO } from "../dtos/taskDTO";
import { JwtAuthGuard } from "src/config/auth.guard";
import { UserAccess } from "src/config/auth/userAccess";

@Controller("tasks")
@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Tareas del usuario', type: [TaskDTO] })
    @ApiResponse({ status: 404, description: 'No se encontro tareas de este usuario' })
    @ApiParam({ name: "id", type: String, description: "ID del usuario" })
    async getTasksUser(@Request() { user }: { user: UserAccess }): Promise<TaskDTO[]> {
        return await this.taskService.getTasksByUser(user.sub);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'Tarea agregada' })
    @ApiResponse({ status: 404, description: 'No se pudo agregar la tarea' })
    @ApiBody({ type: CreateTaskDTO })
    async saveTask(@Body() task: CreateTaskDTO, @Request() { user }: { user: UserAccess }): Promise<void> {
        await this.taskService.saveTask(task, user.sub);
    }

    @Delete(":id")
    @ApiResponse({ status: 200, description: 'Se elimino la tarea' })
    @ApiResponse({ status: 404, description: 'No se pudo eliminar la tarea' })
    @ApiParam({ name: "id", type: String, description: "Eliminar tarea" })
    async deleteTask(@Param("id") id: string, @Request() { user }: { user: UserAccess }): Promise<void> {
        await this.taskService.deleteTask(id, user.sub)
    }

    @Patch(":id")
    @ApiResponse({ status: 200, description: 'Se actualizo la tarea' })
    @ApiResponse({ status: 404, description: 'No se pudo actualizar la tarea' })
    @ApiParam({ name: "id", type: String, description: "ID de la tarea" })
    async updateTask(@Param("id") id: string, @Request() { user }: { user: UserAccess }): Promise<void> {
        await this.taskService.changeStatusOk(id, user.sub);
    }
}