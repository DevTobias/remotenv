import { IsNotEmpty } from 'class-validator';

export class EnvironmentVariable {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: string;
}
