import { Controller, Post, Get, Delete, Body, Param, HttpCode, NotFoundException } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { SaveKnowledgeDto } from './dto/save-knowledge.dto';

@Controller('api')
export class KnowledgeController {
  constructor(private knowledgeService: KnowledgeService) {}

  @Post('save-knowledge')
  @HttpCode(201)
  async saveKnowledge(@Body() dto: SaveKnowledgeDto) {
    const entry = await this.knowledgeService.saveKnowledge(dto);
    return {
      success: true,
      data: {
        id: entry.id,
        title: entry.title,
        summary: entry.summary,
        tags: entry.tags,
        category: entry.category,
        notionPageId: entry.notionPageId,
      },
    };
  }

  @Get('history')
  async getHistory() {
    const entries = await this.knowledgeService.getHistory();
    return { success: true, data: entries };
  }

  @Delete('knowledge/:id')
  async deleteEntry(@Param('id') id: string) {
    try {
      await this.knowledgeService.deleteEntry(id);
      return { success: true, message: 'Entry deleted' };
    } catch (error) {
      if (error.message === 'Entry not found') {
        throw new NotFoundException('Entry not found');
      }
      throw error;
    }
  }

  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
