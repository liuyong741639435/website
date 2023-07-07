import {
  Controller,
  //   Get,
  Inject,
  Post,
  //   Put,
  UseGuard,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { AuthGuard } from '../guard/authGuard';
import { getFormData } from '../utils/formData';
import response from '../utils/response';
import { CommentService } from '../service/comment.service';
import { CancelCommentArticle, CommentArticle } from '../api/comment';
import { validate } from '../validate';
import { commentValidate } from '../validate/comment';

@Controller('/api/comment')
export class CommentController {
  service = new CommentService();

  @Inject()
  ctx: Context;

  // 评论
  @Post('/commentArticle')
  @UseGuard(AuthGuard)
  async commentArticle() {
    const { aid, parentId, content } = getFormData<CommentArticle>(this.ctx);
    const { userId } = this.ctx.userContext;
    const vRes = validate(
      { aid, content, parentId },
      commentValidate.setFollower
    );
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }

    try {
      await this.service.create({
        userId,
        aid,
        parentId,
        content,
      });
      return response.success();
    } catch (error) {
      return response.error(
        error.name === 'SequelizeUniqueConstraintError'
          ? '账号重复'
          : '内部错误'
      );
    }
  }
  // 取消评论  todo还没写完呢
  @Post('/cancelCommentArticle')
  @UseGuard(AuthGuard)
  async cancelCommentArticle() {
    const { id } = getFormData<CancelCommentArticle>(this.ctx);
    // const { userId } = this.ctx.userContext;
    const vRes = validate({ id }, commentValidate.setFollower);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }
  }
}
