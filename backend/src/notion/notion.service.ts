import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { AiProcessedContent } from '../ai/ai.service';

@Injectable()
export class NotionService implements OnModuleInit {
  private readonly logger = new Logger(NotionService.name);
  private notion: Client;
  private databaseId: string;
  private connected = false;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('NOTION_API_KEY')!;
    this.databaseId = this.configService.get<string>('NOTION_DATABASE_ID')!;
    this.notion = new Client({ auth: apiKey });
  }

  async onModuleInit() {
    try {
      await this.notion.users.me({});
      this.connected = true;
      this.logger.log('Notion connected successfully');
    } catch (error) {
      this.connected = false;
      this.logger.warn('Notion connection failed — check your NOTION_API_KEY');
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  async createKnowledgePage(
    title: string,
    url: string,
    processed: AiProcessedContent,
  ): Promise<string> {
    const children: any[] = [
      // Summary section
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: 'Summary' } }],
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: processed.summary } }],
        },
      },
      // Key Insights section
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: 'Key Insights' } }],
        },
      },
      ...processed.keyInsights.map((insight) => ({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ type: 'text', text: { content: insight } }],
        },
      })),
    ];

    // Notable Quotes section
    if (processed.quotes.length > 0) {
      children.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: 'Notable Quotes' } }],
        },
      });
      processed.quotes.forEach((quote) => {
        children.push({
          object: 'block',
          type: 'quote',
          quote: {
            rich_text: [{ type: 'text', text: { content: quote } }],
          },
        });
      });
    }

    // Action Steps section
    if (processed.actionSteps.length > 0) {
      children.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: 'Action Steps' } }],
        },
      });
      processed.actionSteps.forEach((step) => {
        children.push({
          object: 'block',
          type: 'to_do',
          to_do: {
            rich_text: [{ type: 'text', text: { content: step } }],
            checked: false,
          },
        });
      });
    }

    // Source URL
    children.push(
      {
        object: 'block',
        type: 'divider',
        divider: {},
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: 'Source' } }],
        },
      },
      {
        object: 'block',
        type: 'bookmark',
        bookmark: { url },
      },
    );

    const page = await this.notion.pages.create({
      parent: { database_id: this.databaseId },
      properties: {
        Name: {
          title: [{ text: { content: title } }],
        },
        URL: {
          url: url,
        },
        Category: {
          select: { name: processed.category },
        },
        Tags: {
          multi_select: processed.tags.map((tag) => ({ name: tag })),
        },
      },
      children,
    });

    this.logger.log(`Notion page created: ${page.id}`);
    return page.id;
  }

  async archivePage(pageId: string): Promise<void> {
    try {
      await this.notion.pages.update({
        page_id: pageId,
        archived: true,
      });
      this.logger.log(`Notion page archived: ${pageId}`);
    } catch (error) {
      this.logger.error(`Failed to archive Notion page ${pageId}: ${error.message}`);
      throw error;
    }
  }
}
