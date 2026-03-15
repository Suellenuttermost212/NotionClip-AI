import { Controller, Get } from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller('api/auth/notion')
export class NotionController {
  constructor(private notionService: NotionService) {}

  @Get('status')
  async getStatus() {
    const connected = await this.notionService.isConnected();
    return { connected };
  }
}
