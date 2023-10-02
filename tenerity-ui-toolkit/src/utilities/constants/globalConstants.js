import * as constants from '.'

export const getErrorType = () => constants?.alertsOrScreen

export const errorMappings = (errorCode) => {
  const errorData = constants?.errors()?.[errorCode] || null
  return errorData
}
