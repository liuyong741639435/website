import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user';

@Table
class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT, comment: '唯一id' })
  id: number;

  @Column({ type: DataType.BIGINT, comment: '文章id' })
  aid: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, comment: '用户id' })
  userId: number;

  @Column({ type: DataType.BIGINT, comment: '父评论的评论id' })
  parentId: number;

  @Column({ type: DataType.TEXT, comment: '评论内容' })
  content: string;
}

export { Comment };
