import {StopwatchIntervalModel} from '../modules/stopwatch.model';

export class StopWatchInterval {
  static readonly type = '[STOPWATCH] Stopwatch is running';

  constructor(public payload: StopwatchIntervalModel) {}
}

export class PauseStopwatch {
  static readonly type = '[STOPWATCH] Pause Time';

  constructor() {}
}

export class SaveTimeFrame {
  static readonly type = '[STOPWATCH] Save Time';

  constructor(public payload: string[]) {}
}

export class RemoveTimeFrame {
  static readonly type = '[STOPWATCH] Remove Saved Time';

  constructor(public index: number) {}
}

export class ClearAll {
  static readonly type = '[STOPWATCH] Clear state'
}
