import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateTaskDTO {

    @IsString()
    @ApiProperty()
    title: string;

    @IsBoolean()
    @ApiProperty()
    isDone: boolean;
}