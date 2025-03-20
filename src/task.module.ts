import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskService } from "./application/task.service";
import { TaskController } from "./infrastructure/controllers/taskController";
import { TaskModel } from "./infrastructure/models/taskModel";
import { TaskRepositoryInTypeOrm } from "./infrastructure/taskRepositoryInTypeOrm";


@Module({
    imports: [TypeOrmModule.forFeature([TaskModel])],
    exports: [TaskService],
    providers: [TaskService,
        {
            provide: "repository",
            useClass: TaskRepositoryInTypeOrm
        }
    ],
    controllers: [TaskController],
})
export class TaskModule { }