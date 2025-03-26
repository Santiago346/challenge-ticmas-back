import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskService } from "./application/task.service";
import { TaskController } from "./infrastructure/controllers/taskController";
import { TaskModel } from "./infrastructure/models/taskModel";
import { TaskRepositorySQL } from "./infrastructure/taskRepositorySQL";

@Module({
    imports: [TypeOrmModule.forFeature([TaskModel])],
    exports: [TaskService],
    providers: [TaskService,
        {
            provide: "repository",
            useClass: TaskRepositorySQL
        }
    ],
    controllers: [TaskController],
})
export class TaskModule { }