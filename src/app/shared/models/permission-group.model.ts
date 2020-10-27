import { Permission } from './permission.model';

export class PermissionGroup {
  public groupName: string;
  public groupState: boolean;
  public permissions: Permission[];
}
