import { Context } from 'koa';

type ResolverFn = (parent: any, args: any, context: Context, info: any) => any;

export function requireAuth(resolver: ResolverFn): ResolverFn {
  return (parent, args, context, info) => {
    if (!context.user) {
      throw new Error('Unauthorized');
    }
    return resolver(parent, args, context, info);
  };
}