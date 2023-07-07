export enum ArticleState {
  PUBLIC, // 公开
  PRIVATE, // 私有
  DISABLE, // 禁用 // 用户修改不了。
}

// 接口入参
export interface EditArticle {
  aid?: number;
  title: string;
  content: string;
}

export interface SetArticleState {
  aid: number;
  state: ArticleState;
}

export interface DeleteArticle {
  aid: number;
}

export interface ArticleList {
  // 后续 条数
  //   type: string; todo后续补上
  limit?: number;
  offset?: number;
}

export interface ArticleListByUser {
  limit?: number;
  offset?: number;
}

export interface Article {
  aid: number;
}

export interface ArticleByUser {
  aid: number;
}
