import { IsString, IsUrl, IsOptional } from 'class-validator';

export class SaveKnowledgeDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
