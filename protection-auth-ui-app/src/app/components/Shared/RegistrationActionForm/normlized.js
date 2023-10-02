/* eslint-disable import/no-extraneous-dependencies */
import dayjs from 'dayjs'

export const getNormalizeExpirationDate = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 2) {
      return `${onlyNums}/`
    }
    if (onlyNums.length === 4) {
      return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`
    }
  }
  if (onlyNums.length <= 2) {
    return onlyNums
  }
  if (onlyNums.length <= 4) {
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`
  }
  return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`
}

export const stripeCardExpireValidation = (value, CARD_EXPIRATION_DATE) => {
  const regExpCard = new RegExp(CARD_EXPIRATION_DATE)
  if (value) {
    if (regExpCard.test(value.trim())) {
      const today = new Date()
      const CurrentDate = dayjs(
        new Date(
          `${today.getFullYear()
          }-${today.getMonth() + 1
          }-${new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()}`,
        ),
      )
      const mmYY = value.split('/')
      const updatedDate = new Date(`20${mmYY[1]}`, mmYY[0], 0)
      return CurrentDate <= dayjs(updatedDate)
    }
    return false
  }
  return false
}
