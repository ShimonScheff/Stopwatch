import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  clearDisplayTime = ['0', '0', '0', '0', '0', '0'];
  displayTime = this.clearDisplayTime;
  actionText = 'Play';
  running = false;
  timeWatchArray = [];

  counter: any;
  intervalTime: any;

  constructor() {
    // update from local storage
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


  startStopWatch() {
    this.running = !this.running;
    this.actionText = 'Stop';
    const startTime = Date.now() - (this.counter || 0);
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
    }, 1);
  }

  stop() {
    this.actionText = 'Play';
    this.running = !this.running;
    clearInterval(this.intervalTime);
  }

  addTimeFrame() {
    this.timeWatchArray.unshift(this.displayTime);
  }

  remove(index) {
    this.timeWatchArray.splice(index, 1);
  }

  clear() {
    this.timeWatchArray = [];
    this.running = false;
    this.displayTime = this.clearDisplayTime;
    clearInterval(this.intervalTime);
  }

}
