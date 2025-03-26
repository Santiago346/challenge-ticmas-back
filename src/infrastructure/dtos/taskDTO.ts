import { ApiProperty } from "@nestjs/swagger";

export class TaskDTO {
    
    @ApiProperty()
    id: string

    @ApiProperty()
    title: string;

    @ApiProperty()
    isDone: boolean;

    @ApiProperty()
    userId: string; 
}