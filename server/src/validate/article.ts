import { API } from '../api';
import { ArticleState } from '../api/article';

const aid: API.ValidateItem = {
  key: 'aid',
  reg: /^[0-9]{1,12}$/,
  tigs: '参数有误，只能是数字',
};

const state: API.ValidateItem = {
  key: 'state',
  tigs: `参数有误:${Object.values(ArticleState).join('-')}`,
  values: Object.values(ArticleState),
};

const title: API.ValidateItem = {
  key: 'title',
  reg: /^.{0,30}$/,
  tigs: '最大长度30',
  required: false,
};

const content: API.ValidateItem = {
  key: 'content',
  reg: /^.{0,30000}$/,
  tigs: '最大长度30000',
  required: false,
};

// const type: ValidateItem = {
//   key: 'type',
//   reg: /^.{0,30000}$/,
//   tigs: '最大长度30000',
// };

const limit: API.ValidateItem = {
  key: 'limit',
  reg: /^[0-3]{0,10}$/,
  tigs: '最大值999',
  required: false,
};

const offset: API.ValidateItem = {
  key: 'offset',
  reg: /^[0-3]{0,10}$/,
  tigs: '最大值999',
  required: false,
};

export const articleValidate: Record<string, API.ValidateItem[]> = {
  editArticle: [
    {
      ...aid,
      required: false,
    },
    title,
    content,
  ],
  updateArticleState: [aid, state],
  articleList: [limit, offset],
  articleListByUser: [limit, offset],
  article: [aid],
  articleByUser: [aid],
  //   state,
};
