// import globalCommonConstants from 'COMMON_UI/common-global-constant'
// const {
//   globalConstants,
// } = globalCommonConstants

export const constants = () => (require('../default/constants'))

const globalConstants = () => ({
  api: {
    schema: constants()?.apiSchema,
    constants: {
      headers: constants()?.headers,
    },
  },
  idleTimeOut: constants()?.idleTimeOut,
  // theme: require(`resources/${clientId}/theme`)?.theme,
  snackBarTimeOut: constants()?.snackBarTimeOut,
})

export const storageKeys = () => constants()?.storageKeys
export const storageType = () => constants()?.storageType
export const businessLogic = () => require('../default/businessLogic')

export default globalConstants
