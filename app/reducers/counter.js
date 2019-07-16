// @flow
import {
  DATA_FETCH_BEGIN,
  DATA_FETCH_SUCCESS,
  DATA_FETCH_ERROR,
  SHEMA_FETCH_BEGIN,
  SHEMA_FETCH_SUCCESS,
  SHEMA_FETCH_ERROR
} from '../actions/counter';
import type {Action} from './types';

const initialState = {
  data: [],
  shema: [],
  loading: false,
  error: false
};

export default function counter(state = initialState, action: Action) {
  switch (action.type) {
    case DATA_FETCH_BEGIN:
    case SHEMA_FETCH_BEGIN:
      return {...state, loading: true};
    case DATA_FETCH_SUCCESS:
      return {...state, data: action.data, loading: false};
    case DATA_FETCH_ERROR:
    case SHEMA_FETCH_ERROR:
      return {...state, error: true, loading: false};
    case SHEMA_FETCH_SUCCESS:
      return {...state, shema: action.shema, loading: false};
    default:
      return state;
  }
};
