import {
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseGuard,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import * as md5 from 'md5';
import response from '../utils/response';
import { getFormData } from '../utils/formData';
import { getToken } from '../utils/auth';
import { AuthGuard } from '../guard/authGuard';
import {
  Login,
  Register,
  updatePassword,
  updateUserInfo,
  UserInfo,
} from '../api/user';
import { validate } from '../validate';
import { userValidate } from '../validate/user';
import { removeUndefined } from '../utils/tool';
import { getBase64, checkBase64 } from '../utils/graphic-verification-code';

@Controller('/api/user')
export class UserController {
  service = new UserService();

  @Inject()
  ctx: Context;

  @Get('/baseCode')
  async baseCode() {
    return response.success(getBase64());
  }

  // 注册
  @Get('/register')
  @Post('/register')
  async register() {
    const { userName, password, checkCode, code } = getFormData<Register>(
      this.ctx
    );

    const vRes = validate(
      { userName, password, checkCode, code },
      userValidate.register
    );
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }
    // 图形验证码
    const checkBase64Res = checkBase64({
      checkCode,
      code,
    });

    if (checkBase64Res.code !== 0) {
      return response.error(checkBase64Res.msg);
    }

    try {
      await this.service.create({
        userName: userName,
        password: md5(password),
        nickName: '新用户', // 以后搞个包随机生成昵称
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

  // 登录
  @Post('/login')
  async login() {
    console.log('login');
    const { userName, password } = getFormData<Login>(this.ctx);

    const vRes = validate({ userName, password }, userValidate.login);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }

    try {
      const res = await this.service.login({
        userName: userName,
        password: md5(password),
      });

      if (res === null) {
        return response.error('登录失败');
      }
      const token = await getToken({ userId: res.userId });

      return response.success({ token });
    } catch (error) {
      console.log('error', error);
      return response.error('内部错误');
    }
  }

  // 删除当前登录的账号
  @Put('/delete')
  @UseGuard(AuthGuard)
  async delete() {
    const { userId } = this.ctx.userContext;
    try {
      const deleteCount = await this.service.delete({ userId });
      return deleteCount > 0 ? response.success() : response.error();
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 修改密码
  @Post('/updatePassword')
  @UseGuard(AuthGuard)
  async updatePassword() {
    const { password } = getFormData<updatePassword>(this.ctx);
    const { userId } = this.ctx.userContext;

    const vRes = validate({ password }, userValidate.updatePassword);
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }

    try {
      const res = await this.service.updateProfile(
        { password: md5(password) },
        { userId }
      );
      // todo、 要缓存修改密码的userId， 记录修改时间点。后续此userId访问，判断是否在此时间之后。周期性清除 此记录
      return res[0] > 0 ? response.success() : response.error();
    } catch (error) {
      return response.error('内部错误');
    }
  }
  // 修改自身用户信息
  @Post('/updateUserInfo')
  @UseGuard(AuthGuard)
  async updateUserInfo() {
    const { nickName, jobTitle, company, blogAddress, description } =
      getFormData<Partial<updateUserInfo>>(this.ctx);
    const { userId } = this.ctx.userContext;

    const vRes = validate(
      { nickName, jobTitle, company, blogAddress, description },
      userValidate.updateUserInfo
    );
    if (vRes.length > 0) {
      return response.error('参数有误', vRes);
    }

    try {
      const params = {
        nickName,
        jobTitle,
        company,
        blogAddress,
        description,
      };
      // 去掉为null和unfined
      const res = await this.service.updateProfile(removeUndefined(params), {
        userId,
      });
      return res[0] > 0 ? response.success() : response.error();
    } catch (error) {
      return response.error('内部错误');
    }
  }

  // 获取用户信息
  @Get('/userInfo')
  @UseGuard(AuthGuard)
  async userInfo() {
    const userId =
      getFormData<UserInfo>(this.ctx).userId ?? this.ctx.userContext.userId;

    try {
      const res = await this.service.getUserInfo({ userId });
      if (res === null) {
        return response.error('获取失败');
      }
      return response.success({
        userId: res.userId,
        nickName: res.nickName,
        iconUrl: res.iconUrl,
        jobTitle: res.jobTitle,
        company: res.company,
        blogAddress: res.blogAddress,
        description: res.description,
        createdAt: res.createdAt,
      });
    } catch (error) {
      return response.error('内部错误');
    }
  }
}
