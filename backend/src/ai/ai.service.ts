import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AiProcessedContent {
  summary: string;
  keyInsights: string[];
  quotes: string[];
  actionSteps: string[];
  tags: string[];
  category: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY')!;
    this.logger.log(`Initializing Gemini AI (key: ${apiKey.slice(0, 8)}...${apiKey.slice(-4)})`);
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async processContent(
    title: string,
    url: string,
    content: string,
  ): Promise<AiProcessedContent> {
    this.logger.log(`--- AI Processing Start ---`);
    this.logger.log(`Title: ${title}`);
    this.logger.log(`URL: ${url}`);
    this.logger.log(`Content length: ${content.length} chars (sending ${Math.min(content.length, 12000)} chars)`);

    const prompt = `You are a knowledge extraction assistant. Analyze the following webpage content and return a JSON object with these exact fields:
- "summary": A concise 2-3 sentence summary of the content.
- "keyInsights": An array of 3-5 key takeaways or important points.
- "quotes": An array of notable direct quotes from the content (empty array if none).
- "actionSteps": An array of actionable steps or recommendations derived from the content (empty array if not applicable).
- "tags": An array of 3-7 relevant topic tags (lowercase, no hashtags).
- "category": Exactly one of: "Article", "Tutorial", "Documentation", "Repository", "Research", "Other".

Return ONLY valid JSON, no markdown fences or extra text.

Title: ${title}
URL: ${url}

Content:
${content.slice(0, 12000)}`;

    try {
      this.logger.log('Sending request to Gemini (gemini-2.5-flash)...');
      const startTime = Date.now();

      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      });

      const response = await model.generateContent(prompt);
      const elapsed = Date.now() - startTime;
      this.logger.log(`Gemini responded in ${elapsed}ms`);

      const text = response.response.text();
      this.logger.log(`Raw response length: ${text.length} chars`);

      const result = JSON.parse(text);
      this.logger.log(`Parsed result — Category: ${result.category}, Tags: [${(result.tags || []).join(', ')}]`);
      this.logger.log(`Summary preview: ${(result.summary || '').slice(0, 100)}...`);
      this.logger.log(`Key insights: ${(result.keyInsights || []).length}, Quotes: ${(result.quotes || []).length}, Action steps: ${(result.actionSteps || []).length}`);
      this.logger.log(`--- AI Processing Complete ---`);

      return {
        summary: result.summary || '',
        keyInsights: result.keyInsights || [],
        quotes: result.quotes || [],
        actionSteps: result.actionSteps || [],
        tags: result.tags || [],
        category: result.category || 'Other',
      };
    } catch (error) {
      this.logger.error(`--- AI Processing FAILED ---`);
      this.logger.error(`Error type: ${error.constructor?.name}`);
      this.logger.error(`Error message: ${error.message}`);
      if (error.status) this.logger.error(`HTTP status: ${error.status}`);
      if (error.errorDetails) this.logger.error(`Error details: ${JSON.stringify(error.errorDetails, null, 2)}`);
      throw new Error(`AI processing failed: ${error.message}`);
    }
  }
}
