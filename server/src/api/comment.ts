// 接口入参
export interface CommentArticle {
  aid: number;
  parentId: number;
  content: string;
}

export interface CancelCommentArticle {
  id: number;
}
