import { combineReducers } from 'redux'
import { global } from 'tenerity-ui-toolkit'

import * as kba from './kba'
import * as postKba from './kba/postKba'
import * as remainingTrial from './remainingTrial'
import * as creditScore from './creditScore'

export const allReducers = {
  kba,
  postKba,
  remainingTrial,
  creditScore,
}

const reducers = (_reducers) => {
  const { getObjFromObj } = global?.utils

  const mixedReducers = getObjFromObj({ ...allReducers }) || {}
  return combineReducers(getObjFromObj(_reducers, mixedReducers))
}

export default reducers
