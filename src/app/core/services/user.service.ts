import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { generateId } from '../helpers/generators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../../shared/models/base-response.model';
import { UsersContainer } from '../../shared/models/users-container.model';

@Injectable()
export class UserService {
  private storedUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private storedUsersCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
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

  public getUsersCount(): Observable<number> {
    return this.storedUsersCount;
  }

  public addUser(user: User): void {
    const previousUsers = this.storedUsers.value;
    const previousUsersCount = this.storedUsersCount.value;
    const currentUsersCount = previousUsersCount + 1;

    user.id = generateId();

    this.storedUsers.next([...previousUsers, user]);
    this.storedUsersCount.next(currentUsersCount);
  }

  public userExists(id: number): boolean {
    const users = this.storedUsers.value;

    return users.some(u => u.id === id);
  }

  public updateUser(user: User): void {
    const previousUsers = this.storedUsers.value;

    for (let iteratedUser of previousUsers) {
      if (iteratedUser.id === user.id) {
        iteratedUser = user;
      }
    }

    this.storedUsers.next([...previousUsers]);
  }

  public removeUser(id: number): void {
    const previousUsers = this.storedUsers.value;
    const previousUsersCount = this.storedUsersCount.value;
    const currentUsers = previousUsers.filter(u => u.id !== id);
    const currentUsersCount = previousUsersCount - 1;

    this.storedUsers.next([...currentUsers]);
    this.storedUsersCount.next(currentUsersCount);
  }
}
