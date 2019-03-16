import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import seats from './seats/reducer';

export interface State {
  seats: StateType<typeof seats>;
}

const rootReducer = combineReducers({ seats });

export default rootReducer;
