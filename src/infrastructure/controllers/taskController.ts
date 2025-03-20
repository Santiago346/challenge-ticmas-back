import { TaskService } from "src/application/task.service";
import { CreateTaskDTO } from "../dtos/createTaskDTO";
import { Get, Post, Body, Param, Delete, Controller, Patch } from "@nestjs/common";
import { ApiResponse, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { UserDTO } from "../dtos/userDTO";
import { Task } from "src/domain/task";
import { TaskDTO } from "../dtos/taskDTO";


@Controller("tasks")
@ApiTags("Tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de tareas', type: [TaskDTO] })
    @ApiResponse({ status: 400, description: 'No se encontraron tareas' })
    async getAllTasks(
    ): Promise<Task[]> {
        return await this.taskService.findAll();
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