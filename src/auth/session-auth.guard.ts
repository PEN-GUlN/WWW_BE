import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    // if (!session?.user) {
    //   throw new UnauthorizedException('로그인 후 사용해주세요.');
    // }
    if (!session) {
      console.warn('❌ 세션이 아예 없음');
    }
    if (!session?.user) {
      console.warn('❌ 세션은 있지만 user 없음', session);
    }
    return true;
  }
}
