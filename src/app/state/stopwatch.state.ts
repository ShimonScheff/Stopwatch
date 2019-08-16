import {defaultState, StopwatchModel} from '../modules/stopwatch.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ClearAll, PauseStopwatch, RemoveTimeFrame, SaveTimeFrame, StopWatchInterval} from '../actions/stopwatch.action';


export class StopwatchStateModel {
  stopwatch: StopwatchModel;
}

@State<StopwatchStateModel>({
  name: 'StopwatchState',
  defaults: {
    ...defaultState
  }
})
export class StopwatchState {

  @Selector()
  static getStopwatchState(state: StopwatchStateModel) {
    return state.stopwatch;
  }

  @Action(StopWatchInterval)
  stopWatchInterval({getState, setState}: StateContext<StopwatchStateModel>,
                    {payload}: StopWatchInterval) {
    const state = getState();
    setState({
      stopwatch: {
        ...state.stopwatch,
        data: {
          ...state.stopwatch.data,
          counter: payload.counter,
          displayTime: payload.displayTime,
          running: true
        }
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

  @Action(PauseStopwatch)
  pauseStopwatch({getState, setState}: StateContext<StopwatchStateModel>) {
    const state = getState();
    setState({
      stopwatch: {
        data: {
          ...state.stopwatch.data,
          running: false
        },
        timeWatchArray: state.stopwatch.timeWatchArray
      }
    });
  }

  @Action(ClearAll)
  clearAll({setState}: StateContext<StopwatchStateModel>) {
    setState({
      ...defaultState
    });
  }
}
