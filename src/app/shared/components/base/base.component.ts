import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {
  _ngUnsubscriber = new Subject<void>();
  ngOnDestroy(): void {
    this._ngUnsubscriber.next();
  }
}
