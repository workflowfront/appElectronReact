// @flow
import request from 'request';
import type {Dispatch} from '../reducers/types';


export const DATA_FETCH_BEGIN = 'DATA_FETCH_BEGIN';
export const DATA_FETCH_SUCCESS = 'DATA_FETCH_SUCCESS';
export const DATA_FETCH_ERROR = 'DATA_FETCH_ERROR';

export const SHEMA_FETCH_BEGIN = 'SHEMA_FETCH_BEGIN';
export const SHEMA_FETCH_SUCCESS = 'SHEMA_FETCH_SUCCESS';
export const SHEMA_FETCH_ERROR = 'SHEMA_FETCH_ERROR';

const dataFetchBegin = () => ({
    type: DATA_FETCH_BEGIN
  });

const dataFetchSuccess = (data) => ({
    type: DATA_FETCH_SUCCESS,
    data
  })

const dataFetchError = () => ({
    type: DATA_FETCH_ERROR
  })

var optionsData = {
  uri: 'http://marklogic.axes.pro:8022/LATEST/resources/getData',
  auth: {
    user: 'forTest',
    pass: 'nC.FAbYT-o7d2Aa86Vpv',
    sendImmediately: false
  }
};

export const dataFetch = () => (dispatch: Dispatch) => {
  dispatch(dataFetchBegin());
  let data;
  request(optionsData, function (error, response, body) {
    if (!error && response && response.statusCode && response.statusCode == 200) {
      data = body;
      dispatch(dataFetchSuccess(data));
    } else {
      dispatch(dataFetchError());
    }
  });

  return data;
};

const shemaFetchBegin = () => ({
    type: SHEMA_FETCH_BEGIN
  })

const shemaFetchSuccess = (shema) => ({
    type: SHEMA_FETCH_SUCCESS,
    shema
  })

const shemaFetchError = () => ({
    type: SHEMA_FETCH_ERROR
  })

var optionsShema = {
  uri: 'http://marklogic.axes.pro:8022/LATEST/resources/getScheme',
  auth: {
    user: 'forTest',
    pass: 'nC.FAbYT-o7d2Aa86Vpv',
    sendImmediately: false
  }
};
export const shemaFetch = () => (dispatch: Dispatch) => {
  dispatch(shemaFetchBegin());
  let shema;
  request(optionsShema, function (error, response, body) {
    if (!error && response && response.statusCode && response.statusCode == 200) {
      shema = body;
      dispatch(shemaFetchSuccess(shema));
    } else {
      dispatch(shemaFetchError());
    }
  });
  return shema;
};

