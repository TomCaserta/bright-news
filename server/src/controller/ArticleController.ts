import { Request, Response } from 'express';
import { getRepository, Between } from 'typeorm';
import Article from '../entity/Article';

export default class ArticleController {
  public async getAll(_: Request, res: Response) {
    try {
      const articleRepository = getRepository(Article);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate()-1);
      const articles = await articleRepository.find({
        where: {
            published: Between(yesterday, today),
        },
        select: ['url', 'title', 'description', 'sentiment', 'published', 'source'],
        relations: ['source'],
      });
      return res.status(200).json({
        data: articles,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
