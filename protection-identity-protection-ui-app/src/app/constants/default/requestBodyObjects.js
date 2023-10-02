export const requestBodyActivationApproval = Object.seal({
  user_id: '',
  access_validation_code: '',
})

export const requestBodyActivationSetPassword = Object.seal({
  access_token: '',
  password: '',
  phone_number_mobile: '',
  consent: {
    consent_engagement_comm: false,
    consent_agreement: false,
  },
})

export const requestBodyDecryptPrimaryDetails = Object.seal({
  encrypted_primary_details: '',
})

export const requestBodyLogin = Object.seal({
  user_id: '',
  credential: '',
})

export const requestBodyForgotPassword = Object.seal({
  user_id: '',
})

export const requestBodyLogout = Object.seal({
  member_id: '',
  refresh_token: '',
})

export const requestBodyResetPassword = Object.seal({
  key: '',
  member_id: '',
  credentials: '',
})

export const requestBodyRefreshToken = Object.seal({
  member_id: '',
  refresh_token: '',
})

export const addAssetCommonPayload = Object.seal({
  memberId: '',
  category: '',
  type: '',
})

export const requestBodyAddAsset = Object.seal({
  ...addAssetCommonPayload,
  attributes: {
  },
  asset: {
    company: '',
  },
})

export const updateAssetPayload = Object.seal({
  company: '',
})

export const resolveAlertPayload = Object.seal({
  alertId: '',
  status: 'RESOLVED',
})

export const requestBodyPostEmployee = Object.seal({
  membershipId: '',
  firstName: '',
  lastName: '',
  email: '',
})
