import { Provide } from '@midwayjs/decorator';
import { User } from '../entity/user';
import { Profile } from '../api/user';

// 入参如果需要2个， 第一个就是参数，查询的key,第二个参数是条件
// Partial必填非必填的全转换为非必填 & Required 反之
@Provide()
export class UserService {
  // create
  async create(params: {
    userName: string;
    password: string;
    nickName: string;
  }) {
    return await new User(params).save();
  }

  // delete
  async delete(where: { userId: number }) {
    return await User.destroy({
      where,
    });
  }

  // update
  async updateProfile(params: Partial<Profile>, where: { userId: number }) {
    return await User.update(params, {
      where,
    });
  }

  // selecte
  async login(where: { userName: string; password: string }) {
    return await User.findOne({
      where: where,
    });
  }

  async getUserInfo(where: { userId: number }) {
    return await User.findOne({
      where: where,
    });
  }
}
