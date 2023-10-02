export const constants = () => (require('../default/constants'))

const globalConstants = () => ({})

export const storageKeys = () => constants()?.storageKeys

export const storageType = () => constants()?.storageType

export const businessLogic = () => require('../default/businessLogic')

export default globalConstants
