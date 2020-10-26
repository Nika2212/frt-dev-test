import { Events } from '../../core/enums/events';

export class EmitEvent<T = any> {
  constructor(
    public readonly name: Events,
    public readonly payload?: T
  ) {
  }
}
