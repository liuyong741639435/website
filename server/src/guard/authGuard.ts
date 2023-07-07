import { Guard, httpError, IGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { verifyToken } from '../utils/auth';

@Guard()
export class AuthGuard implements IGuard<Context> {
  async canActivate(ctx: Context): Promise<any> {
    const token = ctx.headers['authorization']?.trim();

    // 判断下有没有校验信息
    if (!token) {
      throw new httpError.UnauthorizedError('token未携带');
    }
    try {
      //jwt.verify方法验证token是否有效
      ctx.userContext = await verifyToken(token);
      console.log(ctx.userContext, new Date().getTime() / 1000);
      return true;
    } catch (error) {
      switch (error.message) {
        case 'jwt expired':
          throw new httpError.UnauthorizedError('authorization过期');
          break;
        case 'jwt malformed':
          throw new httpError.UnauthorizedError('authorization格式错误');
          break;
        default:
          throw new httpError.UnauthorizedError('内部错误');
      }
    }
  }
}
