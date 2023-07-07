import { UserContext } from './api/index';

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

declare module '@midwayjs/core' {
  interface Context {
    userContext: UserContext;
  }
}
