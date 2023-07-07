import {
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseGuard,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { AuthGuard } from '../guard/authGuard';
import { ArticleService } from '../service/article.service';
import {
  Article,
  ArticleByUser,
  ArticleList,
  ArticleListByUser,
  ArticleState,
  DeleteArticle,
  EditArticle,
  SetArticleState,
} from '../api/article';
import { getFormData } from '../utils/formData';
import response from '../utils/response';
import { validate } from '../validate';
import { articleValidate } from '../validate/article';

@Controller('/api/article')
export class ArticleController {
  service = new ArticleService();

  @Inject()
  ctx: Context;

  // 编辑文章，或者创建文章
  @Post('/editArticle')
  @UseGuard(AuthGuard)
  async editArticle() {
    const { aid, title, content } = getFormData<EditArticle>(this.ctx);
    const { userId } = this.ctx.userContext;
    const vRes = validate({ aid, title, content }, articleValidate.editArticle);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }
    // 没传入aid，创建文章，并返回ai
    if (aid === undefined) {
      try {
        const res = await this.service.create({
          userId,
          title,
          content,
          state: ArticleState.PRIVATE,
        });
        return response.success({ aid: res.aid });
      } catch (error) {
        return response.error('内部错误');
      }
    } else {
      try {
        const res = await this.service.updateArticle(
          {
            title,
            content,
          },
          { aid, userId, state: ArticleState.PRIVATE }
        );
        return res[0] > 0 ? response.success() : response.error();
      } catch (error) {
        return response.error('内部错误');
      }
    }
  }

  // 修改文章的状态
  @Post('/setArticleState')
  @UseGuard(AuthGuard)
  async setArticleState() {
    const { aid, state } = getFormData<SetArticleState>(this.ctx);
    const { userId } = this.ctx.userContext;

    const vRes = validate({ aid, state }, articleValidate.updateArticleState);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }
    try {
      const res = await this.service.updateArticleState({
        userId,
        aid,
        state,
      });
      return res[0] > 0 ? response.success() : response.error();
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 删除文章
  @Put('/deleteArticle')
  @UseGuard(AuthGuard)
  async deleteArticle() {
    const { aid } = getFormData<DeleteArticle>(this.ctx);
    const { userId } = this.ctx.userContext;
    try {
      const deleteCount = await this.service.delete({ userId, aid });
      return deleteCount > 0
        ? response.success({ deleteCount })
        : response.error('删除失败');
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 查询所有文章简略信息
  @Get('/articleList')
  async articleList() {
    const { limit, offset } = getFormData<ArticleList>(this.ctx);
    const vRes = validate({ limit, offset }, articleValidate.articleList);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }
    try {
      const res = await this.service.getArticleList(
        {
          state: ArticleState.PUBLIC,
        },
        limit,
        offset
      );
      return response.success(res ?? []);
    } catch (error) {
      return response.error('内部错误');
    }
  }
  // 查询用户所有文章简略信息
  @Get('/articleListByUser')
  async articleListByUser() {
    const { limit, offset } = getFormData<ArticleListByUser>(this.ctx);
    const { userId } = this.ctx.userContext;
    const vRes = validate({ limit, offset }, articleValidate.articleListByUser);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }
    try {
      const res = await this.service.getArticleListByUser(
        {
          userId,
        },
        limit,
        offset
      );
      return response.success(res ?? []);
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 访问他人文章 todo 要记录访问量
  @Get('/article')
  async article() {
    const { aid } = getFormData<Article>(this.ctx);
    const vRes = validate({ aid }, articleValidate.article);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }
    try {
      const res = this.service.getArticle({ aid });
      return res !== null ? response.success(res) : response.error();
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 查询自身文章
  @Get('/getArticleByUser')
  @UseGuard(AuthGuard)
  async getArticleByUser() {
    const { aid } = getFormData<ArticleByUser>(this.ctx);
    const { userId } = this.ctx.userContext;
    const vRes = validate({ aid }, articleValidate.articleByUser);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }
    try {
      const res = this.service.getArticleByUser({ aid, userId });
      return res !== null ? response.success(res) : response.error();
    } catch (error) {
      return response.error('内部错误');
    }
  }
}
