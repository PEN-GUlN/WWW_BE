import { IsEnum, IsString, Length } from 'class-validator';
import { Type } from 'src/comm/enum/type';

export class PostRequest {
  @Length(1, 50)
  @IsString()
  title: string;

  @Length(1, 3000)
  @IsString()
  content: string;

  @IsEnum(Type)
  type: Type;
}
