import {StopwatchModel} from '../modules/stopwatch.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {RemoveTimeFrame, SaveTimeFrame, StartStopwatch} from '../actions/stopwatch.action';


export class StopwatchStateModel {
  stopwatch: StopwatchModel;
}

@State<StopwatchStateModel>({
  name: 'StopwatchState',
  defaults: {
    stopwatch: {
      displayTime: ['fff'],
      timeWatchArray: []
    }
  }
})
export class StopwatchState {

  @Selector()
  static getStopwatchState(state: StopwatchStateModel) {
    return state.stopwatch;
  }

  @Action(StartStopwatch)
  startStopwatch({getState, patchState}: StateContext<StopwatchStateModel>,
                 {payload}: StartStopwatch) {
    const state = getState();
    console.log(state);

    patchState({
      stopwatch: {
        displayTime: payload.displayTime,
        timeWatchArray: payload.timeWatchArray,
      }
    });
  }

  @Action(SaveTimeFrame)
  saveTimeFrame({getState, setState}: StateContext<StopwatchStateModel>,
                {payload}: SaveTimeFrame) {

    const state = getState();
    const timeWatchArray = state.stopwatch.timeWatchArray;
    timeWatchArray.unshift(payload);
    setState({
      stopwatch: {
        ...state.stopwatch,
        timeWatchArray
      }
    });
  }

  @Action(RemoveTimeFrame)
  removeTimeFrame({getState, setState}: StateContext<StopwatchStateModel>,
                  {index}: RemoveTimeFrame) {

    const state = getState();
    const timeWatchArray = state.stopwatch.timeWatchArray;
    timeWatchArray.splice(index, 1);
    setState({
      stopwatch: {
        ...state.stopwatch,
        timeWatchArray
      }
    });

  }
}
