import {Component, OnDestroy} from '@angular/core';

import {Observable, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {Store} from '@ngxs/store';

import {ClearAll, PauseStopwatch, SaveTimeFrame, StopWatchInterval} from '../../actions/stopwatch.action';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnDestroy {
  clearDisplayTime = ['0', '0', '0', '0', '0', '0'];
  displayTime = this.clearDisplayTime;
  displayTime$: Observable<[][]>;
  running = false;
  counter: any;
  intervalTime: any;
  sub: Subscription;

  constructor(
    private store: Store
  ) {
    this.displayTime$ = this.store.select(state => state.StopwatchState.stopwatch.data.displayTime);
    this.sub = this.store.select(state => state.StopwatchState.stopwatch.data)
      .pipe(first()).subscribe((data) => {
        this.counter = data.counter;
        this.displayTime = data.displayTime;
        if (data.running) {
          this.startStopWatch();
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  startStopWatch() {
    const startTime = Date.now() - (this.counter || 0);
    this.running = true;
    this.intervalTime = setInterval(() => {
      this.counter = Date.now() - startTime;
      let milliseconds: any = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
      let minutes: any = Math.floor(this.counter / 60000);
      let seconds: any = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
      if (Number(minutes) < 10) {
        minutes = '0' + minutes;
      } else {
        minutes = '' + minutes;
      }
      if (Number(milliseconds) < 10) {
        milliseconds = '0' + milliseconds;
      } else {
        milliseconds = '' + milliseconds;
      }
      if (Number(seconds) < 10) {
        seconds = '0' + seconds;
      } else {
        seconds = '' + seconds;
      }

      const time = minutes + seconds + milliseconds;
      this.displayTime = time.split('');
      this.store.dispatch(new StopWatchInterval({
        displayTime: this.displayTime,
        counter: this.counter
      }));
    }, 1);
  }

  stop() {
    this.running = false;
    clearInterval(this.intervalTime);
    this.store.dispatch(new PauseStopwatch());
  }

  async addTimeFrame() {
    this.store.dispatch(new SaveTimeFrame());
  }

  clear() {
    this.running = false;
    clearInterval(this.intervalTime);
    this.store.dispatch(new ClearAll());
  }

}

