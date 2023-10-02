/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */

export const storageKeys = {
  member_id: 'memberId',
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  membership_id: 'membership_id',
  REQUESTING_SHARED_CREDENTIALS: 'REQUESTING_SHARED_CREDENTIALS',
  CLEAR_CREDENTIALS: 'CLEAR_CREDENTIALS',
  CREDENTIALS_SHARING: 'CREDENTIALS_SHARING',
}

export const storageType = 'sessionStorage'
export const localStorage = 'localStorage'

const convertType = (value) => {
  const v = Number(value)
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(v) ? v
    : value === 'undefined' ? undefined
      : value === 'null' ? null
        : value === 'true' ? true
          : value === 'false' ? false
            : value
}

export const storageAvailable = (type) => {
  const storage = window[type]
  try {
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

export const getStorageItem = (key, storageType_ = storageType) => {
  let returnValue = null
  if (storageAvailable(storageType_)) {
    returnValue = window[storageType_].getItem(key)
  }
  return convertType(returnValue)
}

export const setStorageItem = (key, value, storageType_ = storageType) => {
  if (storageAvailable(storageType_)) {
    window[storageType_].setItem(key, value)
  }
}

export const deleteStorageItem = (key, storageType_ = storageType) => {
  if (storageAvailable(storageType_)) {
    window[storageType_].removeItem(key)
  }
}

export const clearStorage = (storageType_ = storageType) => {
  if (storageAvailable(storageType_)) {
    Object.keys(window[storageType_])
      .forEach((item) => deleteStorageItem(item))
    window[storageType_].clear()
  }
}
