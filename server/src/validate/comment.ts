import { ValidateItem } from '../api';

const aid: ValidateItem = {
  key: 'aid',
  reg: /^[0-9]{1,12}$/,
  tigs: '参数有误，只能是数字',
};

const id: ValidateItem = {
  key: 'aid',
  reg: /^[0-9]{1,12}$/,
  tigs: '参数有误，只能是数字',
};

const parentId: ValidateItem = {
  key: 'aid',
  reg: /^[0-9]{1,12}$/,
  tigs: '参数有误，只能是数字',
};

const content: ValidateItem = {
  key: 'content',
  reg: /^.{0,1000}$/,
  tigs: '最大长度1000',
  required: false,
};

export const commentValidate: Record<string, ValidateItem[]> = {
  editArticle: [aid, parentId, content],
  cancelCommentArticle: [id],
};
