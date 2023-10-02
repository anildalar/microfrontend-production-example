import { global } from 'tenerity-ui-toolkit'
import { SELF_REGISTRATION } from '../js/globalConstants'

const { api, utils, appUtils: { getMemberId } } = global
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const loginAPI = (requestBody, data) => {
  const {
    formValues, apiEndpoint, configStoreData,
  } = data
  const body = requestBody
  body.username = utils?.encryptData(formValues?.email, configStoreData?.publicKey)
  body.password = utils?.encryptData(formValues?.password, configStoreData?.publicKey)
  return api?.axiosInstance().post(apiEndpoint, body)
}

export const generateOTPAPI = (requestBody, data) => {
  const {
    formValues, apiEndpoint, configStoreData,
  } = data
  const body = requestBody
  body.userEmail = utils?.encryptData(formValues?.username, configStoreData?.publicKey)
  body.userMobile = utils?.encryptData(formValues?.mobile, configStoreData?.publicKey)
  body.type = formValues?.type?.toUpperCase()
  body.medium = formValues?.medium?.toUpperCase()
  return api?.axiosInstance().post(apiEndpoint.replace('#member_id#', getMemberId()), body)
}

export const verifyOTPAPI = (requestBody, data) => {
  const {
    formValues, apiEndpoint, configStoreData,
  } = data
  const body = requestBody
  body.username = utils?.encryptData(formValues?.username, configStoreData?.publicKey)
  body.type = formValues?.type?.toUpperCase()
  body.otp = formValues?.otp
  return api?.axiosInstance().post(apiEndpoint.replace('#member_id#', getMemberId()), body)
}

export const getcommPrefAPI = (data) => api?.axiosInstance().get(`${data?.apiEndpoint}`.replace('#member_id#', getMemberId()))

export const getResetPasswordApprovalAPI = (data) => api?.axiosInstance().get(`${data?.apiEndpoint}`.replace('#key#', data?.key))

export const postResetPasswordAPI = (requestBody, data) => {
  const {
    key, formValues, apiEndpoint, configStoreData, username,
  } = data
  const body = requestBody
  body.username = utils?.encryptData(username, configStoreData?.publicKey)
  body.password = utils?.encryptData(formValues?.password, configStoreData?.publicKey)
  return api?.axiosInstance().post(apiEndpoint?.replace('#key#', key), body)
}

export const enrollmentAPI = (requestBody, data) => {
  const {
    formValues, apiEndpoint, configStoreData,
  } = data
  const body = requestBody
  let addresses = ''
  const mailingAddress = {
    addressLine1: formValues?.mailing_addressLine1,
    addressLine2: formValues?.mailing_addressLine2,
    postOfficeBox: null,
    city: formValues?.mailing_city,
    state: formValues?.mailing_state,
    zipCode: formValues?.mailing_zipCode,
    type: 'HOME',
    isBillingAddress: !!formValues?.isBilling,
  }
  if (formValues?.isBilling) {
    addresses = [mailingAddress]
  } else {
    const billingAddress = {
      addressLine1: formValues?.billing_addressLine1,
      addressLine2: formValues?.billing_addressLine2,
      postOfficeBox: null,
      city: formValues?.billing_city,
      state: formValues?.billing_state,
      zipCode: formValues?.billing_zipCode,
      type: 'HOME',
      isBillingAddress: true,
    }
    addresses = [
      mailingAddress,
      billingAddress,
    ]
  }
  body.firstName = utils?.encryptData(formValues?.firstName, configStoreData?.publicKey)
  body.middleName = utils?.encryptData(formValues?.middleName, configStoreData?.publicKey)
  body.freeOneTimeCode = formValues?.activationNumber
  body.groupAccessCode = formValues?.accessCode
  body.lastName = utils?.encryptData(formValues?.lastName, configStoreData?.publicKey)
  body.password = utils?.encryptData(formValues?.confirmPassword, configStoreData?.publicKey)
  body.email = utils?.encryptData(formValues?.emailAddress, configStoreData?.publicKey)
  body.suffix = formValues?.suffix
  const birthDate = utils?.dateFormatter(formValues?.date_of_birth,
    configStoreData?.validation?.date?.format)
  body.dob = utils?.encryptData(birthDate, configStoreData?.publicKey)
  body.phoneNumber = utils?.encryptData(`${formValues?.countryCode}-${formValues?.mobileNumber}`, configStoreData?.publicKey)
  body.paymentCardDetails = formValues?.type === SELF_REGISTRATION ? {
    cardNumber: utils?.encryptData(formValues?.cardNumber?.replace(/[^\d]/g, ''), configStoreData?.publicKey),
    expiryMonth: MONTHS[formValues?.expirationDate?.split('/')?.[0] - 1],
    expiryYear: `20${formValues?.expirationDate?.split('/')?.[1]}`,
    cardHolderName: utils?.encryptData(
      formValues?.cardHolderName, configStoreData?.publicKey,
    ),
    secureCode: utils?.encryptData(formValues?.secureCode, configStoreData?.publicKey),
  } : null
  body.address = addresses
  body.SSN = utils?.encryptData(formValues?.ssn, configStoreData?.publicKey)
  body.solicitationId = formValues?.solicitationId
  body.campaignId = formValues?.campaignId
  body.consent = {
    consentEngagementComm: formValues?.consentEngagementComm,
    consentAgreement: formValues?.consentAgreement,
  }
  body.source = 'api/web'

  return api?.axiosInstance().post(apiEndpoint, body)
}

export const forgotPasswordAPI = (data) => {
  const {
    formValues, apiEndpoint, configStoreData,
  } = data
  const body = {
    username: utils?.encryptData(
      formValues?.forgotPassword_email, configStoreData?.publicKey,
    ),
  }
  return api?.axiosInstance().post(apiEndpoint, body)
}

export const getSolicitationAPI = (data) => api?.axiosInstance().get(`${data?.apiEndpoint}`.replace('#sol_id#', data?.solicitationId))

export const validateCodeAPI = (data) => {
  const {
    code, solicitationId, apiEndpoint,
  } = data
  const body = {
    solId: solicitationId,
    code,
    // code: utils?.encryptData(code, configStoreData?.publicKey),
  }

  return api?.axiosInstance().post(apiEndpoint, body)
}
