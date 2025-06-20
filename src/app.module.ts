import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
