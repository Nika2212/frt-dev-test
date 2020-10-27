import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { generateId } from '../helpers/generators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../../shared/models/base-response.model';
import { UsersContainer } from '../../shared/models/users-container.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserService {
  private storedUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private storedUsersCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  public getUsersFromServer(): Promise<void> {
    return new Promise<void>(resolve => {
      this.http.get<BaseResponse<UsersContainer>>(environment.api + 'users.json')
        .subscribe(payload => {
          if (!payload.isError) {
            const users = payload.data.items;
            const count = payload.data.count;

            this.storeUsers(users, count);
          } else {
            throw new Error(payload.message);
          }

          resolve();
        });
    });
  }

  public storeUsers(users: User[], count: number): void {
    this.storedUsers.next(users);
    this.storedUsersCount.next(count);
  }

  public getUsers(): Observable<User[]> {
    return this.storedUsers;
  }

  public getUser(id: number): User {
    const users = this.storedUsers.value;
    const user = users.find(u => u.id === id);

    if (!user) {
      return null;
    } else {
      return {...user};
    }
  }

  public getUsersCount(): Observable<number> {
    return this.storedUsersCount;
  }

  public addUser(user: User): void {
    const previousUsers = this.storedUsers.value;
    const previousUsersCount = this.storedUsersCount.value;
    const currentUsersCount = previousUsersCount + 1;

    user.id = generateId();

    this.storedUsers.next([{...user}, ...previousUsers]);
    this.storedUsersCount.next(currentUsersCount);
    this.snackBar.open('User added successfully', null, {duration: 2 * 1000});
  }

  public userExists(id: number): boolean {
    const users = this.storedUsers.value;

    return users.some(u => u.id === id);
  }

  public updateUser(user: User): void {
    const previousUsers = this.storedUsers.value;
    const oldUserIndex = previousUsers.findIndex(u => u.id === user.id);

    previousUsers[oldUserIndex] = user;

    this.storedUsers.next([...previousUsers]);
    this.snackBar.open('User updated successfully', null, {duration: 2 * 1000});
  }

  public removeUser(id: number): void {
    const previousUsers = this.storedUsers.value;
    const previousUsersCount = this.storedUsersCount.value;
    const currentUsers = previousUsers.filter(u => u.id !== id);
    const currentUsersCount = previousUsersCount - 1;

    this.storedUsers.next([...currentUsers]);
    this.storedUsersCount.next(currentUsersCount);
    this.snackBar.open('User removed successfully', null, {duration: 2 * 1000});
  }
}
