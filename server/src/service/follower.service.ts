import { Provide } from '@midwayjs/decorator';
import { Follower } from '../entity/follower';
import { FollowerState } from '../api/follower';
import { Op } from 'sequelize';

// 入参如果需要2个， 第一个就是参数，查询的key,第二个参数是条件
// Partial必填非必填的全转换为非必填 & Required 反之
@Provide()
export class FollowerService {
  // create
  async setFollower(params: {
    userId: number;
    followerUserId: number;
    followerState: FollowerState;
  }) {
    // 除非找到一个满足查询参数的结果,否则方法 findOrCreate 将在表中创建一个条目
    return await Follower.findOrCreate({
      where: params,
      defaults: {
        params,
      },
    });
  }

  // delete
  async deleteFollower(where: { userId: number; followerUserId: number }) {
    return await Follower.destroy({
      where,
    });
  }
  // update

  // selecte
  async getFollwerList(where: { userId: number }) {
    return await Follower.findAll({
      where: where,
    });
  }

  async getByfollwerList(where: { followerUserId: number }) {
    return await Follower.findAll({
      where,
    });
  }

  async getFriendsList(params: { userId: number }) {
    const { userId } = params;
    return await Follower.findAll({
      where: {
        [Op.or]: [{ userId }, { followerUserId: userId }],
      },
    });
  }
}
