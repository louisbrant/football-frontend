import {Directive, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

@Directive({
  selector: '[appUnsubscribe]'
})
export class UnsubscribeDirective implements OnDestroy {

  protected subscription = new Subject<boolean>();

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.complete();
  }

}
