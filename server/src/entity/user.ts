import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
class User extends Model {
  // 常用参数defaultValue 默认值
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, comment: '用户id' })
  userId: number;

  @Column({
    type: DataType.CHAR,
    comment: '账户',
    allowNull: false,
    unique: true,
  })
  userName: string;

  @Column({ type: DataType.CHAR, comment: '密码-md5', allowNull: false })
  password: string;

  // 这些可以修改的,后续可能改到独立的表里面 todo
  @Column({ type: DataType.CHAR, comment: '昵称' })
  nickName: string;

  @Column({ type: DataType.CHAR, comment: '头像' })
  iconUrl: string;

  @Column({ type: DataType.CHAR, comment: '职位' })
  jobTitle: string;

  @Column({ type: DataType.CHAR, comment: '公司' })
  company: string;

  @Column({ type: DataType.CHAR, comment: '个人博客地址' })
  blogAddress: string;

  @Column({ type: DataType.CHAR, comment: '个人介绍' })
  description: string;
}

export { User };
