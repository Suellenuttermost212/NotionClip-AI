import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeEntry } from '../entities/knowledge-entry.entity';
import { AiService } from '../ai/ai.service';
import { NotionService } from '../notion/notion.service';
import { SaveKnowledgeDto } from './dto/save-knowledge.dto';

@Injectable()
export class KnowledgeService {
  private readonly logger = new Logger(KnowledgeService.name);

  constructor(
    @InjectRepository(KnowledgeEntry)
    private knowledgeRepo: Repository<KnowledgeEntry>,
    private aiService: AiService,
    private notionService: NotionService,
  ) {}

  async saveKnowledge(dto: SaveKnowledgeDto): Promise<KnowledgeEntry> {
    this.logger.log(`Processing: ${dto.title}`);

    // 1. AI processing
    const contentToProcess = dto.content || dto.description || dto.title;
    const processed = await this.aiService.processContent(
      dto.title,
      dto.url,
      contentToProcess,
    );

    // 2. Save to database immediately (fast response)
    const entry = this.knowledgeRepo.create({
      title: dto.title,
      url: dto.url,
      description: dto.description ?? undefined,
      summary: processed.summary,
      keyInsights: processed.keyInsights,
      quotes: processed.quotes,
      actionSteps: processed.actionSteps,
      tags: processed.tags,
      category: processed.category,
    });

    const saved = await this.knowledgeRepo.save(entry);

    // 3. Create Notion page in background (don't block response)
    if (this.notionService.isConnected()) {
      this.notionService
        .createKnowledgePage(dto.title, dto.url, processed)
        .then(async (notionPageId) => {
          await this.knowledgeRepo.update(saved.id, { notionPageId });
          this.logger.log(`Notion page linked to entry ${saved.id}`);
        })
        .catch((err) => {
          this.logger.warn(`Background Notion save failed: ${err.message}`);
        });
    } else {
      this.logger.warn('Notion not connected — skipping Notion save');
    }

    return saved;
  }

  async getHistory() {
    return this.knowledgeRepo.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async deleteEntry(id: string): Promise<void> {
    const entry = await this.knowledgeRepo.findOne({ where: { id } });
    if (!entry) {
      throw new Error('Entry not found');
    }

    // Delete from Notion if page exists
    if (entry.notionPageId) {
      try {
        await this.notionService.archivePage(entry.notionPageId);
        this.logger.log(`Notion page archived for entry ${id}`);
      } catch (error) {
        this.logger.warn(`Could not archive Notion page: ${error.message}`);
      }
    }

    // Delete from database
    await this.knowledgeRepo.remove(entry);
    this.logger.log(`Entry deleted: ${id}`);
  }
}
