/* eslint-disable no-debugger */
/* eslint-disable max-len */
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { global } from 'tenerity-ui-toolkit'
import * as app from './app'
import * as appConfig from './appConfig'

export const allReducers = {
  app,
  appConfig,
}

const reducers = (_reducers) => {
  const { getObjFromObj } = global?.utils

  const mixedReducers = getObjFromObj({ ...allReducers }, { form: formReducer }) || {}
  return combineReducers(getObjFromObj(_reducers, mixedReducers))
}

export default reducers
