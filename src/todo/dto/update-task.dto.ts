import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTasksDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
