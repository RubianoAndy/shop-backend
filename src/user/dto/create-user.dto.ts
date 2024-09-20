import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name_1: string;

    @IsNotEmpty()
    lastname_1: string;
}
