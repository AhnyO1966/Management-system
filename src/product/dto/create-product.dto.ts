import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    @IsString()
    Color: string;

    @IsNotEmpty()
    @IsNumber()
    Weight: number;


    @IsNotEmpty()
    @IsNumber()
    Price: number;
}
