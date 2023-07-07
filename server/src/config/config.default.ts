import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: '1672908742942_4771',
  koa: {
    port: 80,
  },
  bodyParser: {
    enableTypes: ['json', 'form', 'text', 'xml'],
    formLimit: '1mb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    xmlLimit: '1mb',
  },
  // 数据库操作
  sequelize: {
    dataSource: {
      default: {
        database: 'blog_mid_dev',
        username: 'root',
        password: 'dd123456!',
        host: '127.0.0.1',
        port: 3306,
        encrypt: false,
        dialect: 'mysql',
        define: { charset: 'utf8' },
        timezone: '+08:00',
        entities: ['./entity'],
        // 本地的时候，可以通过 sync: true 直接 createTable
        // sync: true,
      },
      //   default: {
      //     database: 'blog_mid_dev',
      //     username: 'dev',
      //     password: 'Dd123456!',
      //     host: 'rm-bp1qms7525mpv6e0g5o.mysql.rds.aliyuncs.com',
      //     port: 3306,
      //     encrypt: false,
      //     dialect: 'mysql',
      //     define: { charset: 'utf8' },
      //     timezone: '+08:00',
      //     entities: ['./entity'],
      //     // 本地的时候，可以通过 sync: true 直接 createTable
      //     sync: true,
      //   },
    },
  },
  // jwt
  jwt: {
    expiresIn: 2 * 24 * 60 * 60, // 60s ?? 2天
  },
} as MidwayConfig;
