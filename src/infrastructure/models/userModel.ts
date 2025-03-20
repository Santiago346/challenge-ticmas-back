import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from "typeorm";
import { TaskModel } from "./taskModel";


@Entity({ name: "Users" })
export class UserModel {

    @PrimaryGeneratedColumn('uuid', { name: "ID" })
    id: string;

    @Column({ name: "Name", type: "varchar" })
    name: string;

    @Column({ name: "Email", type: "varchar" })
    email: string;

    @Column({ name: "Password", type: "varchar"})
    password: string

    @OneToMany(() => TaskModel, task => task.user)
    tasks: Relation<TaskModel[]>
    
}