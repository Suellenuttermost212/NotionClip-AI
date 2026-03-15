import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeEntry } from '../entities/knowledge-entry.entity';
import { AiModule } from '../ai/ai.module';
import { NotionModule } from '../notion/notion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KnowledgeEntry]),
    AiModule,
    NotionModule,
  ],
  controllers: [KnowledgeController],
  providers: [KnowledgeService],
})
export class KnowledgeModule {}
