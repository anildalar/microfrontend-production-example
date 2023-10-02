export const requestBodyLogin = Object.seal({
  username: '',
  password: '',
})

export const requestBodyEnrollment = Object.seal({
  firstName: '',
  middleName: '',
  freeOneTimeCode: '',
  groupAccessCode: '',
  lastName: '',
  email: '',
  password: '',
  dob: '',
  suffix: '',
  address: [
    {
      addressLine1: '',
      addressLine2: '',
      postOfficeBox: '',
      city: '',
      state: '',
      zipCode: '',
      type: '',
      isBillingAddress: false,
    },
  ],
  paymentCardDetails: null,
  SSN: '',
  phoneNumber: '',
  solicitationId: '55558882NM',
  campaignId: 'camp4552',
  consent: {
    consentEngagementComm: false,
    consentAgreement: false,
  },
  source: '',
})

export const requestBodyOTPGeneration = Object.seal({
  userEmail: '',
  userMobile: '',
  type: '',
  medium: '',
})

export const requestBodyOTPVerification = Object.seal({
  otp: '',
  username: '',
  type: '',
})

export const requestBodyResetPassword = Object.seal({
  username: '',
  password: '',
})

export const requestBodyForgotPassword = Object.seal({
  password: '',
})
