import { ValidateItem } from '../api';
import { FollowerState } from '../api/follower';

const followerUserId: ValidateItem = {
  key: 'followerUserId',
  reg: /^[0-9]{1,12}$/,
  tigs: '参数有误，只能是数字',
};

const followerState: ValidateItem = {
  key: 'followerState',
  tigs: `参数有误:${Object.values(FollowerState).join('-')}`,
  values: Object.values(FollowerState),
};

export const followerValidate: Record<string, ValidateItem[]> = {
  setFollower: [followerUserId, followerState],
  setCancelFollower: [followerUserId],
};
