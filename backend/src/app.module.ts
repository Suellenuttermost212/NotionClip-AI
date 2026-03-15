import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as neonServerless from '@neondatabase/serverless';
import ws from 'ws';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { AiModule } from './ai/ai.module';
import { NotionModule } from './notion/notion.module';
import { KnowledgeEntry } from './entities/knowledge-entry.entity';

// Configure Neon to use WebSocket
neonServerless.neonConfig.webSocketConstructor = ws;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [KnowledgeEntry],
        synchronize: true,
        ssl: { rejectUnauthorized: false },
        driver: neonServerless as any,
      }),
    }),
    KnowledgeModule,
    AiModule,
    NotionModule,
  ],
})
export class AppModule {}
