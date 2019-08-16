import {StateModel, StopwatchIntervalModel} from '../modules/stopwatch.model';
import {StopwatchStateModel} from '../state/stopwatch.state';

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
}

export class RemoveTimeFrame {
  static readonly type = '[STOPWATCH] Remove Saved Time';

  constructor(public index: number) {}
}

export class ClearAll {
  static readonly type = '[STOPWATCH] Clear state'
}

export class UpdateFromLocalStorage {
  static readonly type = '[APP] Update All State';

  constructor(public stopwatch: StateModel) {}
}
