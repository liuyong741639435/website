import { Provide } from '@midwayjs/decorator';
import { InjectRepository } from '@midwayjs/sequelize';
import { Comment } from '../entity/comment';

@Provide()
export class CommentService {
  @InjectRepository(Comment)
  // create
  async create(params: {
    aid: number;
    userId: number;
    parentId: number;
    content: string;
  }) {
    return await new Comment(params).save();
  }
}
