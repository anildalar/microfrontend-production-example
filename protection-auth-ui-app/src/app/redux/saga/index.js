/* istanbul ignore file */
import { all, takeLatest } from 'redux-saga/effects'
import sagaActions from '../actions'

import doLogin from './login'
import doLogout from './logout'
import getResetPasswordApproval from './resetPasswordApproval'
import postForgotPassword from './forgotPassword'
import postResetPassword from './resetPassword'
import postEnrollment from './enrollment'
import commPref from './commPref'
import otpCall from './otp'
import generateOtpCall from './otp/generate'
import solicitation from './solicitation'
import postValidateCode from './enrollment/validateCode'

// eslint-disable-next-line no-unused-vars
export default function* rootSaga(sagas) {
  yield all([
    takeLatest(sagaActions.POST_ENROLLMENT, postEnrollment),
    takeLatest(sagaActions.GET_RESET_PASSWORD_APPROVAL, getResetPasswordApproval),
    takeLatest(sagaActions.POST_FORGOT_PASSWORD, postForgotPassword),
    takeLatest(sagaActions.POST_LOGIN, doLogin),
    takeLatest(sagaActions.POST_LOGOUT, doLogout),
    takeLatest(sagaActions.POST_RESET_PASSWORD, postResetPassword),
    takeLatest(sagaActions.GET_COMM_PREF, commPref),
    takeLatest(sagaActions.POST_OTP, otpCall),
    takeLatest(sagaActions.POST_GENERATE_OTP, generateOtpCall),
    takeLatest(sagaActions.GET_SOL_DETAILS, solicitation),
    takeLatest(sagaActions.POST_VALIDATE_CODE, postValidateCode),
  ])
}
