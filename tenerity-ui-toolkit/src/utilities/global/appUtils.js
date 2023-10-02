
import Cookies from 'js-cookie'

export const storageKeys = {
  member_id: 'memberId',
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  membership_id: 'membership_id',
  REQUESTING_SHARED_CREDENTIALS: 'REQUESTING_SHARED_CREDENTIALS',
  CLEAR_CREDENTIALS: 'CLEAR_CREDENTIALS',
  CREDENTIALS_SHARING: 'CREDENTIALS_SHARING',
}

/*
  minutes in days =  val/24*60
  e.g. for 30 mins = 30/24*60 = 1/48
*/
export const setAuthData = (data) => {
  data?.memberId && Cookies.set(storageKeys?.member_id, data?.memberId, { secure: true, expires: 1 / 48 })
  data?.access_token && Cookies.set(storageKeys?.access_token, data?.access_token, { secure: true, expires: 1 / 48 })
  data?.refresh_token && Cookies.set(storageKeys?.refresh_token, data?.refresh_token, { secure: true, expires: 1 / 48 })
  data?.ref_token && Cookies.set('ref_token', data?.ref_token, { secure: true, expires: 1 / 48 })
}

export const getAuthStatus = () => {
  const member_id = Cookies.get(storageKeys?.member_id)
  const access_token = Cookies.get(storageKeys?.access_token)
  const refresh_token = Cookies.get(storageKeys?.refresh_token)
  return member_id && access_token && refresh_token
}

export const clearAuthData = () => {
  Cookies.remove(storageKeys?.member_id)
  Cookies.remove(storageKeys?.access_token)
  Cookies.remove(storageKeys?.refresh_token)
  Cookies.remove('ref_token')
}

export const clearCookie = (cookieKey) => {
  Cookies.remove(cookieKey)
}

export const getAllCookies = () => {
  return Cookies.get()
}

export const getMemberId = () => Cookies.get(storageKeys?.member_id) || ''