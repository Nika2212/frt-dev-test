import { Subscription } from 'rxjs';
import { ICONS, IMAGES } from '../../config/constants';

export class BaseComponent {
  protected subscriptions: Subscription[] = [];

  public icons: string = ICONS;
  public images: string = IMAGES;

  protected addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  protected clearSubscriptions(): void {
    this.subscriptions.map(s => s.unsubscribe());
  }
}
