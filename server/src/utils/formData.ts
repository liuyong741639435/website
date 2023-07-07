import { Context } from '@midwayjs/koa';
export function getFormData<T>(ctx: Context): T {
  switch (ctx.method) {
    case 'GET':
      return ctx.request.query as any;
    case 'POST':
      return ctx.request.body as any;
    case 'PUT':
      return ctx.request.body as any;
    default:
      console.log('尚未覆盖方法:', ctx.method);
      return {} as any;
  }
}
