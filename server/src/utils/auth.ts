/** 生成token 解析token */

import SecretKey from './secretKey';
import { JwtService } from '@midwayjs/jwt';
import config from '../config/config.default';

// 生成非对称密钥
const { prikey, pubkey } = new SecretKey();

const jwtService = new JwtService();

// 生成token
async function getToken<T extends object>(data: T) {
  return await jwtService.sign(data, prikey, {
    algorithm: 'RS256', // 加密算法
    expiresIn: config.jwt.expiresIn, // 到期日
  });
}

// 解析token
async function verifyToken(token: string): Promise<any> {
  // { userId: 6, iat: 1673404684, exp: 1673577484 } iat: 生效时间 exp: 过期时间  s单位
  return await jwtService.verify(token, pubkey, { complete: false });
}

export { getToken, verifyToken };
