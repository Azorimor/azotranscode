import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AuthDto } from ".";

export class SignupDto extends AuthDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;
}
