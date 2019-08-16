import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {RemoveTimeFrame} from '../../actions/stopwatch.action';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent {
  timeWatchArray$: Observable<[][]>;

  constructor(private store: Store) {
    this.timeWatchArray$ = this.store.select(state => state.StopwatchState.stopwatch.timeWatchArray);
  }

  remove(index) {
    this.store.dispatch(new RemoveTimeFrame(index));
  }

}
