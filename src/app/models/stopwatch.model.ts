export interface StopwatchModel {
  data: {
    counter: number;
    displayTime: string[];
    running: boolean;
  };
  timeWatchArray: string[][];
}

export interface StopwatchIntervalModel {
  displayTime: string[];
  counter: number;
}


export const defaultState = {
  stopwatch: {
    data: {
      counter: 0,
      displayTime: ['0', '0', '0', '0', '0', '0'],
      running: false
    },
    timeWatchArray: []
  }
};
