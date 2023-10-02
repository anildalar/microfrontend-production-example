// /* eslint-disable no-debugger */
// /* eslint-disable max-len */
import { combineReducers } from 'redux'
import { global } from 'tenerity-ui-toolkit'

import * as resetPassword from './resetPassword'
import * as userLogin from './login'
import * as forgotPassword from './forgotPassword'
import * as userLogout from './logout'
import * as userEnrollment from './enrollment'
import * as resetPasswordApproval from './resetPasswordApproval'
import * as otp from './otp'
import * as generateOtp from './otp/generate'
import * as commPref from './commPref'
import * as solicitation from './solicitation'

export const allReducers = {
  userEnrollment,
  userLogin,
  forgotPassword,
  userLogout,
  resetPassword,
  resetPasswordApproval,
  otp,
  generateOtp,
  commPref,
  solicitation,
}

const reducers = (_reducers) => {
  const { getObjFromObj } = global?.utils

  const mixedReducers = getObjFromObj({ ...allReducers }) || {}
  return combineReducers(getObjFromObj(_reducers, mixedReducers))
}

export default reducers
