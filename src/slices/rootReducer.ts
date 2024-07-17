import { combineReducers } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { RESET_APP } from './actions/authActions';
import AuthSlice from './AuthSlice';

const appReducer = combineReducers({
  auth: AuthSlice,
});

const rootReducer = (state: any, action: Action) => {
  if (action.type === RESET_APP) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
