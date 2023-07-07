export enum FollowerState {
  FOLLOW, // 关注
  SHIELD, // 屏蔽
  BLACKLIST, // 黑名单
}

// 接口入参
export interface SetFollower {
  followerUserId: number;
  followerState: FollowerState;
}

export interface SetCancelFollower {
  followerUserId: number;
}
