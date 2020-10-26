import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Events } from '../enums/events';
import { EmitEvent } from '../../shared/models/emit-event.model';

@Injectable()
export class EventBusService {
  private readonly subject$: Subject<EmitEvent> = new Subject<EmitEvent>();

  public on<T>(event: Events, actions: (payload: T) => any): Subscription {
    return this.subject$.pipe(filter((e: EmitEvent) => e.name === event), map((e: EmitEvent) => e.payload)).subscribe(actions);
  }

  public emit<T>(event: EmitEvent<T>): void {
    this.subject$.next(event);
  }
}
