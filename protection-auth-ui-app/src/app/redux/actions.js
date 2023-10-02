import * as forgotPasswordReducer from './reducers/forgotPassword'
import * as loginReducer from './reducers/login'
import * as logoutReducer from './reducers/logout'
import * as resetPasswordReducer from './reducers/resetPassword'
import * as resetPasswordApprovalReducer from './reducers/resetPasswordApproval'
import * as enrollmentReducer from './reducers/enrollment'
import * as commPrefReducer from './reducers/commPref'
import * as otpReducer from './reducers/otp'
import * as generateOtpReducer from './reducers/otp/generate'
import * as solicitationReducer from './reducers/solicitation'

const sagaActions = {
  POST_ENROLLMENT: `${enrollmentReducer.postEnrollment.type}`,
  GET_RESET_PASSWORD_APPROVAL: `${resetPasswordApprovalReducer.getResetPasswordApproval.type}`,
  POST_FORGOT_PASSWORD: `${forgotPasswordReducer.postForgotPassword.type}`,
  POST_LOGIN: `${loginReducer.postLogin.type}`,
  POST_OTP: `${otpReducer.postOtp.type}`,
  POST_GENERATE_OTP: `${generateOtpReducer.postGenerateOtp.type}`,
  GET_COMM_PREF: `${commPrefReducer.getCommPref.type}`,
  POST_LOGOUT: `${logoutReducer.postLogout.type}`,
  POST_RESET_PASSWORD: `${resetPasswordReducer.postResetPassword.type}`,
  SET_OTP_ERROR: `${otpReducer.setError.type}`,
  GET_SOL_DETAILS: `${solicitationReducer.getSolicitation.type}`,
  POST_VALIDATE_CODE: 'enrollment/validateCode',
}

export default sagaActions
