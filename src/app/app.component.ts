import {Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {UpdateFromLocalStorage} from './actions/stopwatch.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store) {
    let state = '';
    setInterval(() => {
      const current = localStorage.getItem('@@STATE');
      if (current && state !== current) {
        state = current;
        const stateObj = JSON.parse(current).StopwatchState;
        this.store.dispatch(new UpdateFromLocalStorage(stateObj));
      }
    }, 0);
  }
}
