import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { UserModel } from "./userModel";

@Entity({ name: "Tasks" })
export class TaskModel {

    @PrimaryGeneratedColumn('uuid', { name: "Id"})
    id: string;

    @Column({ name: "Title", type: "varchar" })
    title: string;

    @Column({name: "Status", type: "boolean"})
    status: boolean;

    @Column({ name: "UserId", type: "varchar" })
    userId: string;

    @ManyToOne(() => UserModel, user => user.tasks, {onDelete: "CASCADE"})
    @JoinColumn({ name: "UserId" })
    user: Relation<UserModel>
    
}