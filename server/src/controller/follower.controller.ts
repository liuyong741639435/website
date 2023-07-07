import { Controller, Get, Inject, Post, UseGuard } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { AuthGuard } from '../guard/authGuard';
import { FollowerService } from '../service/follower.service';
import { UserService } from '../service/user.service';
import { SetCancelFollower, SetFollower } from '../api/follower';
import { getFormData } from '../utils/formData';
import response from '../utils/response';
import { validate } from '../validate';
import { followerValidate } from '../validate/follower';

@Controller('/api/follower')
export class FollowerController {
  service = new FollowerService();

  @Inject()
  ctx: Context;

  // 关注
  @Post('/setFollower')
  @UseGuard(AuthGuard)
  async setFollower() {
    const { followerUserId, followerState } = getFormData<SetFollower>(
      this.ctx
    );
    const { userId } = this.ctx.userContext;

    if (followerUserId === userId) {
      return response.error('参数有误');
    }

    const vRes = validate(
      { followerUserId, followerState },
      followerValidate.setFollower
    );
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }

    try {
      // 先查目标followerUserId是否存在

      const userInfo = await new UserService().getUserInfo({
        userId: followerUserId,
      });

      if (userInfo === null) {
        return response.error('目标不存在');
      }
      await this.service.setFollower({
        followerUserId,
        userId,
        followerState,
      });
      return response.success();
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 取消关注
  @Post('/setCancelFollower')
  @UseGuard(AuthGuard)
  async setCancelFollower() {
    const { followerUserId } = getFormData<SetCancelFollower>(this.ctx);
    const { userId } = this.ctx.userContext;

    if (followerUserId === userId) {
      return response.error('参数有误');
    }

    const vRes = validate(
      { followerUserId },
      followerValidate.setCancelFollower
    );
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }

    try {
      await this.service.deleteFollower({ userId, followerUserId });
      return response.success();
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 我关注的
  @Get('/follwerList')
  @UseGuard(AuthGuard)
  async follwerList() {
    const { userId } = this.ctx.userContext;
    try {
      const res = await this.service.getFollwerList({
        userId,
      });

      return response.success(res);
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 关注我的
  @Get('/byfollwerList')
  @UseGuard(AuthGuard)
  async byfollwerList() {
    const { userId } = this.ctx.userContext;
    try {
      const res = await this.service.getByfollwerList({
        followerUserId: userId,
      });

      return response.success(res);
    } catch (error) {
      return response.error('内部错误');
    }
  }
  // 相互关注的

  @Get('/friendsList')
  @UseGuard(AuthGuard)
  async friendsList() {
    const { userId } = this.ctx.userContext;
    try {
      // 得到关注或者被关注为userId用户的所有记录
      //   userId为主动方;
      const lead = await this.service.getFollwerList({
        userId,
      });
      //    userId为被动方;
      const passive = await this.service.getByfollwerList({
        followerUserId: userId,
      });

      // userId的粉丝id[]
      const followerUserIdList = passive.map(({ userId }) => userId);

      const resData = lead.filter(item =>
        followerUserIdList.includes(item.userId)
      );

      return response.success(resData);
    } catch (error) {
      return response.error('内部错误');
    }
  }
}
