import { UserService } from '../services/user.service';

export function initDataResolverFactory(provider: UserService): any {
  return () => provider.getUsersFromServer();
}
