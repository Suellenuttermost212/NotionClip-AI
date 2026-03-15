import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('knowledge_entries')
export class KnowledgeEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'jsonb', nullable: true })
  keyInsights: string[];

  @Column({ type: 'jsonb', nullable: true })
  quotes: string[];

  @Column({ type: 'jsonb', nullable: true })
  actionSteps: string[];

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  notionPageId: string;

  @CreateDateColumn()
  createdAt: Date;
}
