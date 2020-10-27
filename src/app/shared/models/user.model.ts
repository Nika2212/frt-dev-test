import { Roles } from '../../core/enums/roles';
import { PermissionGroup } from './permission-group.model';

export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public isActive: boolean;
  public role: Roles;
  public permissionGroup: PermissionGroup[];
  public isSuperAdmin: boolean;
}
