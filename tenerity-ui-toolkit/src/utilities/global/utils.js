import JSEncrypt from 'jsencrypt'
import moment from 'moment'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import { getErrorType } from '../constants/globalConstants'

// 2048
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugEkoKoaIZLbn0Gj4AXvKgngQXGahW/TiOijzXr1Tu/pmxLaciG+NYwfz1BY7/BM6DWpD/A9hgAqXkrHpitXHCWdpynOs9mSWTIYNV3ylCm1ImfEz6MjF0SSYPilYjVDu1cFDjcJq5076vHxLtSXvCYFFOIAlN1RH0klGsK6e0A2bxc19U/7k4f/fQ5sUBKesRFdUUsyxPslsjG2xbO45jPsvmD2Wj3l+qNqC/lMC7Tc8QN8R6iHAIzFjAtvEE5fHwn3GLapdojRBPeapSYR1FX2wDOmto7Dtef+xYNHtntDlzPvvs2C4ykgcoPGeP0z1+2oP9psQKXS0V1enTlMpQIDAQAB'
const privateKey = 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDKTKN/2FW7r5tZ9Fpo5VEsfLRQAJedWHNzA7XEJ9AH1dAG3YDCrzVzBmYTXjxT/h3fY/reTxRJcOsJ7n4v5TkeT9md+U8u25pdIbPPdq+QBgNv2qWuDx/6xYoeRnbzmn0CgvyyT/j2BXiBpk6GErQ30xPFehmkWx7q6YPobV1Gi1oGjO1WyopKDs/pbC7tQt8C0MEwUK0zB4t7lufI/j0K2XcU4/4Z/Dbc+yeiE7FMInLDWnSQdHk5cOVV3AAgtWEZp5NXl8g7wqrURD5zS4muZYedhBUjAmbAfn6e889fC9HGmwL94z5Cy9hzJ0KVZHlGP/uZkYqqXrS+rEUzbb6/AgMBAAECggEALGmu635fNBlVjeYrgyP1MkMegwHeR1kH35RM74eeEFpMlXVDs3orzdj1yALEU9xSSpz0kqHh3k3ADCoj4ff9Fj6JlDkLvUnRFek0RLPVz1TCpGfoP9JqPu/nZsYpj0m3cDm5qJwOGFUTI8OTMbQhhK/+gzhPMNoga4pgv0JjW/0QEARyvmcKL0fjL4IdDgJa5+gy5KVrwLAaVqb14PkLojWYbgF41CwTKTJZRSweQnyw4IhSKceIdTX+q7ixryLbiVLvOJg8qnz+ygkf4kQRkJ7sE0UCd903DMW4UK0OMJqV6MmRskiqmuRR6n1D/6Nv0lwe9F55Y2l37kMFoOARYQKBgQDopOTd+iR5HHwuo55yunFbn78RaDzsK3g0nFzgiM1QbpLQkhCnXjfZ8FCakenbWGT07J+g9v/U1Ppy/UyoO21GqXmMZjrYbdRKnIw7wcxHgtFH4S3klwuNxdq0G9sTwQUogXKniks6JaXyTEC7vGZkV1Vxsn9gm13Rhl2qfO64+wKBgQDem91jgXu10zh7/XitLesMEKtvpFgSDhwz8w9jRnkmxRseTEZxLfq/we/l9qjikveT83YZYVfZeOqHGN+rc+XE9ZSS8YPYMtI9pWTZbOPBDgjiiNx1EXxPuiVNR9vCj/3czwYmt4T/bKoeikTavdDBfVRGSDFysKbeYpnVW+/uDQKBgQC/a431J3EDRfDX30DsXYQQQ6zPAdm+6TWK9G1nQqjM2W5rtwOE8v05kYaA6DZniJ/o9xmRNCrkUCmSm+CLO/p5/dBJOYSJuDTI/25TbO5MmNLiNeGxCKc1C+sb7x+fbV51Ka3RNPUY7wlQCHXrAuWtAj8HwjsUnkHfuJMxSIKUKQKBgQDKMrk9EPfViC3eMbXTV8oQA3Q0zApTHA3yAe0QN4sD9DVVp+K0GxeP5hCJySpN40COWq4DD7BEENi2LZm8mmEyLf7uGgGv9zmQVRLti0K0sJLRcY8NpvxLTsFjGMo8R55HWqQztq5Pc9xyMRWpupBLsBNEY37Gtj5b8SPZ8NBWYQKBgQDH/Vs/2/Z6dFSblkUBiYbt3uL8FViCNjTyhYCVjfTt75mWiEYOfDcZ2yOx36MDItENi9VYAQGzYohhiQyJJDPfoS5/6aSz7/ZYrYgohiV7+uO2c8hdC8f2GojyOZibxIQ9GyRejuiDh/A98EE4GDw2M3duU+PggUBzzGDJHn9mjQ=='

export const encryptData = (message, pubKey = publicKey) => {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(pubKey)
  return message ? jsEncrypt.encrypt(message) : null
}

export const decryptData = (message, privKey = privateKey) => {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPrivateKey(privKey)
  return jsEncrypt.decrypt(message)
}

export const isNullOrUndefined = (message) => (typeof message === 'object'
  ? Object.keys(message).length === 0
  : message?.length === 0 || typeof message === 'undefined')

export const getInteger = (val, defaultValue = 0) => parseInt(val, 10) || defaultValue

export const isNotEmpty = (value) => {
  if (!value) {
    return false
  }

  let newValue = value
  if (typeof value === 'number') {
    newValue = newValue.toString()
  }
  return !!newValue.trim()
}

// eslint-disable-next-line no-nested-ternary
export const getError = (error, pre, defaultErrCode = 'PROTECTION_ERR_GENERIC_ALERT') => {
  const httpStatusCode = error?.response?.status
  const responseErrorCode = Array.isArray(error?.response?.data?.errors)
    ? error?.response?.data?.errors?.[0]?.code
    : error?.response?.data?.error?.code
  // eslint-disable-next-line no-nested-ternary
  return Math.floor(httpStatusCode / 100) === 5
    ? 'PROTECTION_INTERNAL_SERVER_ERR'
    : responseErrorCode && getErrorType()?.[`${pre}${responseErrorCode}`]
      ? `${pre}${responseErrorCode}`
      : defaultErrCode
}

export const dateFormatter = (value, format) => {
  const date = new Date(`${value}`)
  return moment(date).format(format || 'DD.MM.YYYY')
}

/* istanbul ignore next */
export const connectReduxFormUtil = (component, formName, fieldsArray) => {
  // Decorate with connect to read form values
  const selector = formValueSelector(formName) // <-- same as form name
  const FormWithConnect = connect((state) => {
    // can select values individually and in group
    const values = selector(state, ...fieldsArray)
    return fieldsArray.length > 1 ? values : { [fieldsArray[0]]: values }
  })(component)
  return FormWithConnect
}

export const getObjFromObj = (
  mainObj = {},
  initObj = {},
  extractKey = 'default',
) => {
  const obj = { ...initObj }
  Object?.entries(mainObj)?.forEach(([key, value]) => {
    obj[key] = value?.[extractKey]
  })
  return obj
}

export const toCapitalise = (str) => {
  const arr = str?.split(' ')
  for (let i = 0; i < arr?.length; i += 1) {
    arr[i] = arr?.[i]?.charAt(0)?.toUpperCase() + arr?.[i]?.slice(1)
  }
  return arr.join(' ')
}

export const deepClone = (object) => JSON?.parse(JSON?.stringify(object))

export const getCamelCasedFormat = (key) => key?.replace(/_([a-z])/g, (m, w) => w?.toUpperCase())

export const getCMSKeysInCamelCasedFormat = (obj = {}) => Object?.keys(obj)?.reduce(
  (acc, key) => ({
    ...acc,
    [getCamelCasedFormat(key)]: obj[key],
  }),
  {},
)

export const getFieldStateColor = (touched, invalid) => {
  let state = 'primary'
  if (touched) {
    state = invalid ? 'error' : 'secondary'
  }
  return state
}

export const getCountryCode = (
  defaultCountryCode,
  supportedCountryCodes,
  searchKey = 'country',
) => supportedCountryCodes?.find(
  (countryCode) => countryCode?.[searchKey] === defaultCountryCode,
)

export const storageAvailable = (type) => {
  const storage = window[type]
  try {
    const x = '__storage_test__'
    storage?.setItem(x, x)
    storage?.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

export const setStorageItem = (key, value, storageType) => {
  if (storageAvailable(storageType)) {
    window[storageType].setItem(key, value)
  }
}

export const getIcons = (data) => data?.reduce((acc, val) => {
  const iconName = val?.icon_type?.toLowerCase()?.split(' ')?.join('_')
  return {
    lightFile: {
      ...acc?.lightFile,
      [iconName]: val?.light_file,
    },
    darkFile: {
      ...acc?.darkFile,
      [iconName]: val?.dark_file,
    },
    disabledFile: {
      ...acc?.disabledFile,
      [iconName]: val?.disabled_file,
    },
    smallIconFile: {
      ...acc?.smallIconFile,
      [iconName]: val?.small_icon_file,
    },
  }
}, {
  light: {},
  dark: {},
})

export const getColorByAlertSeverity = (severity) => {
  const colorMapping = {
    low: 'success',
    medium: 'warning',
    high: 'error',
    default: 'default',
    not_activated: 'default',
    unavailable: 'default',
  }
  return colorMapping[severity] || colorMapping.default
}

export const getNormalizeCreditCard = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 4) {
      return `${onlyNums} `
    }
    if (onlyNums.length === 8) {
      return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} `
    }
    if (onlyNums.length === 12) {
      return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8, 12)} `
    }
  }
  if (onlyNums.length <= 4) {
    return onlyNums
  }
  if (onlyNums.length <= 8) {
    return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)}`
  }
  if (onlyNums.length <= 12) {
    return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8, 12)}`
  }
  return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8, 12)} ${onlyNums.slice(12, 16)}`
}

export const luhnCheck = (cardNo) => {
  const cardNumber = `${cardNo}`
  const nDigits = cardNumber.length
  let nSum = 0
  let isSecond = false
  for (let i = nDigits - 1; i >= 0; i -= 1) {
    let d = cardNumber[i].charCodeAt() - '0'.charCodeAt()
    if (isSecond === true) d *= 2
    nSum += parseInt(d / 10, 10)
    nSum += d % 10
    isSecond = !isSecond
  }
  return (nSum % 10 === 0)
}

export const maskPhoneNumber = (inputString, supportedCountryCodes) => {
  const countryCodeData = inputString.split('-')
  const countryCode = countryCodeData[0]
  const mobileNumber = countryCodeData[1]

  const country = getCountryCode(countryCode, supportedCountryCodes, 'code')
  const regex = /#/g
  let inputIndex = 0
  const textMask = country?.inputMask?.pattern?.replace(new RegExp('[\\d]', 'g'), '#')
  const maskedMobileNumber = textMask?.replace(regex, () => {
    if (inputIndex < mobileNumber.length) {
      inputIndex += 1
      return mobileNumber[inputIndex - 1]
    }
    // If the input string is shorter than expected, fill with empty space
    return ''
  })
  return ` ${countryCode}-${maskedMobileNumber}`
}