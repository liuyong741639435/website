import { Provide } from '@midwayjs/decorator';
import { InjectRepository } from '@midwayjs/sequelize';
import { Article } from '../entity/article';
import { ArticleState } from '../api/article';

@Provide()
export class ArticleService {
  @InjectRepository(Article)

  // create
  async create(params: {
    userId: number;
    title: string;
    content: string;
    state: ArticleState;
  }) {
    return await new Article(params).save();
  }

  // delete
  async delete(params: { aid: number; userId: number }) {
    return await Article.destroy({
      where: params,
    });
  }

  // update
  async updateArticle(
    params: {
      title: string;
      content: string;
    },
    where: { aid: number; userId: number; state: ArticleState }
  ) {
    return await Article.update(params, {
      where: where,
    });
  }

  async updateArticleState(params: {
    userId: number;
    aid: number;
    state: ArticleState;
  }) {
    return await Article.update(
      {
        state: params.state,
      },
      {
        where: {
          aid: params.aid,
          userId: params.userId,
        },
      }
    );
  }

  // selecte
  async getArticleList(
    where: { state: ArticleState },
    limit: number,
    offset: number
  ) {
    return await Article.findAndCountAll({
      where,
      offset,
      limit,
    });
  }
  async getArticleListByUser(
    where: { userId: number },
    limit: number,
    offset: number
  ) {
    return await Article.findAndCountAll({
      where,
      offset,
      limit,
    });
  }
  async getArticle(where: { aid: number }) {
    return await Article.findOne({
      where,
    });
  }
  async getArticleByUser(where: { aid: number; userId: number }) {
    return await Article.findOne({
      where,
    });
  }
}
