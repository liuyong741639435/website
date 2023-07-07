import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import { ArticleState } from '../api/article';
import { User } from './user';

@Table
class Article extends Model {
  // 常用参数defaultValue 默认值
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, comment: '文章id' })
  aid: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, comment: '用户id' })
  userId: number;

  @Column({ type: DataType.CHAR, comment: '标题' })
  title: string;

  @Column({ type: DataType.TEXT, comment: '文章内容' })
  content: string;

  @Column({ type: DataType.TEXT, comment: '文章简介' })
  articleAbstract: string;

  @Column({
    type: DataType.SMALLINT,
    comment: '状态 0-public,1-private,2-delete',
    defaultValue: 1, // todo 这里面用枚举,但是暂时还没定下来
  })
  state: ArticleState;

  @Column({
    type: DataType.SMALLINT,
    comment: '浏览数',
    defaultValue: 0,
  })
  browseCount: number;

  @Column({
    type: DataType.SMALLINT,
    comment: '点赞数',
    defaultValue: 0,
  })
  supportCount: number;

  @Column({
    type: DataType.SMALLINT,
    comment: '评论数',
    defaultValue: 0,
  })
  commentCount: number;
}

export { Article };
