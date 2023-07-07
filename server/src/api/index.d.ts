import { ArticleState } from './article';
import { FollowerState } from './follower';

// 环境相关。 入参与npm传入参数相关
declare namespace API {
  // 登录之后的上下文
  interface UserContext {
    userId: number;
    username: string;
    phoneNum: string;
  }

  // 校验相关
  interface ValidateItem {
    key: string;
    tigs: string;
    reg?: RegExp;
    required?: boolean;
    values?: Array<ArticleState | FollowerState | string>;
  }
}
