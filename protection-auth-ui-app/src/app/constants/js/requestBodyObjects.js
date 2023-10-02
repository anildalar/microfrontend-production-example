// import globalCommonConstants from 'COMMON_UI/common-global-constant'
// const { requestBodyObjects } = globalCommonConstants

const requestBodyObjects = () => {
  const obj = require('../default/requestBodyObjects')
  return { ...obj }
}

export default requestBodyObjects
