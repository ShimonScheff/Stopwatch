import {StopwatchModel} from '../modules/stopwatch.model';

export class StartStopwatch {
  static readonly type = '[STOPWATCH] Start';

  constructor(public payload: StopwatchModel) {}
}

export class SaveTimeFrame {
  static readonly type = '[STOPWATCH] Save Time';

  constructor(public payload: string[]) {}
}

export class RemoveTimeFrame {
  static readonly type = '[STOPWATCH] Remove Saved Time';

  constructor(public index: number) {}
}
