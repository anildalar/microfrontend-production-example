import * as globalFuncs from './global'
import * as sessionStorageFuncs from './storage'

const data = {
  member_id: 'value',
  membership_id: 'value',
  access_token: 'value',
  refresh_token: 'value',
}

describe('- Global functions', () => {
  test('- Check isNullOrUndefined', () => {
    expect(globalFuncs.isNullOrUndefined('test')).toBeFalsy()
    expect(globalFuncs.isNullOrUndefined('')).toBeTruthy()
    expect(globalFuncs.isNullOrUndefined({})).toBeTruthy()
    expect(globalFuncs.isNullOrUndefined()).toBeTruthy()
  })

  test('- Check getInteger', () => {
    expect(globalFuncs.getInteger(null)).toBe(0)
    expect(globalFuncs.getInteger(undefined)).toBe(0)
    expect(globalFuncs.getInteger(null, 10)).toBe(10)
    expect(globalFuncs.getInteger(undefined, 20)).toBe(20)
    expect(globalFuncs.getInteger(1234)).toBe(1234)
    const obj = { test: 1 }
    expect(globalFuncs.getInteger(obj?.test)).toBe(1)
    expect(globalFuncs.getInteger(obj?.test2)).toBe(0)
  })

  test('- Check isNotEmpty', () => {
    expect(globalFuncs.isNotEmpty('')).toBeFalsy()
    expect(globalFuncs.isNotEmpty('  ')).toBeFalsy()
    expect(globalFuncs.isNotEmpty('test')).toBeTruthy()
    expect(globalFuncs.isNotEmpty(1234)).toBeTruthy()
  })

  test('- Check getColorBySeverity', () => {
    expect(globalFuncs.getColorBySeverity('low')).toBe('success')
    expect(globalFuncs.getColorBySeverity('medium')).toBe('warning')
    expect(globalFuncs.getColorBySeverity('high')).toBe('error')
    expect(globalFuncs.getColorBySeverity('')).toBe('default')
  })

  test('- Check getError', () => {
    expect(globalFuncs.getError()).toBe('SME_ERR_GENERIC')
    expect(globalFuncs.getError(null)).toBe('SME_ERR_GENERIC')
    expect(globalFuncs.getError({})).toBe('SME_ERR_GENERIC')
    globalFuncs.setAuthData(data)
    expect(globalFuncs.getError({
      response: {
        status: 401,
      },
    }, '')).toBeNull()
    sessionStorageFuncs.clearStorage()
    expect(globalFuncs.getError({
      response: {
        data: {
          code: 'CSE401',
        },
      },
    }, 'SME_LOGIN_ERR_')).toBe('SME_LOGIN_ERR_CSE401')
    expect(globalFuncs.getError(
      {
        response: {},
      },
    )).toBe('SME_ERR_GENERIC')
  })

  test('- Check getFieldStateColor', () => {
    expect(globalFuncs.getFieldStateColor()).toBe('primary')
    expect(globalFuncs.getFieldStateColor(false, false)).toBe('primary')
    expect(globalFuncs.getFieldStateColor(false, true)).toBe('primary')
    expect(globalFuncs.getFieldStateColor(true, true)).toBe('error')
    expect(globalFuncs.getFieldStateColor(true, false)).toBe('success')
  })

  test('- Check getAuthStatus && setAuthData', () => {
    globalFuncs.setAuthData(data)
    expect(globalFuncs.getAuthStatus()).toBe('value')
    sessionStorageFuncs.clearStorage()
    expect(globalFuncs.setAuthData(data)).toBeUndefined()
    delete data.refresh_token
    globalFuncs.setAuthData(data)
    expect(globalFuncs.getAuthStatus()).toBeUndefined()
    globalFuncs.setAuthData(data)
    expect(globalFuncs.getAuthStatus()).toBeNull()
  })

  test('- Check encryptData & decryptData', () => {
    const testData = ['test', 'test', 'test', 'test']
    expect(globalFuncs.encryptData()).toBe(false)
    expect(globalFuncs.decryptData()).toBe(false)
    expect(globalFuncs.decryptData(globalFuncs.encryptData(false))).toBe('')
    expect(globalFuncs.decryptData(globalFuncs.encryptData(true))).toBe('')
    expect(globalFuncs.decryptData(globalFuncs.encryptData(0))).toBe('')
    expect(globalFuncs.decryptData(globalFuncs.encryptData(1))).toBe('')
    expect(globalFuncs.decryptData(globalFuncs.encryptData('0'))).toBe('0')
    expect(globalFuncs.decryptData(globalFuncs.encryptData('1'))).toBe('1')
    expect(globalFuncs.decryptData(globalFuncs.encryptData('App Protection'))).toBe('App Protection')
    expect(globalFuncs.decryptData(globalFuncs.encryptData('App Protection'))).not.toBe('AppProtection')
    expect(JSON.parse(globalFuncs.decryptData(
      globalFuncs.encryptData(JSON.stringify(testData)),
    ))).toStrictEqual(testData)
  })

  test('- Check format date', () => {
    expect(globalFuncs.dateFormatter({ value: '2022-03-14T14:36:26.079Z' })).toBe('14.03.2022')
  })

  test('- Check luhnCheck', () => {
    expect(globalFuncs.luhnCheck('4485275742308327')).toBeTruthy()
    expect(globalFuncs.luhnCheck(4412546875126454)).toBeFalsy()
    expect(globalFuncs.luhnCheck(6011329933655299)).toBeTruthy()
    expect(globalFuncs.luhnCheck(123456789)).toBeFalsy()
  })

  test('- Check getAlertsData', () => {
    expect(globalFuncs.getAlertsData()).toBeTruthy()
    expect(globalFuncs.getAlertsData()).toStrictEqual({
      assetFound: undefined,
      company: undefined,
      createdDate: undefined,
      description: undefined,
      details: undefined,
      id: undefined,
      severity: undefined,
      source: undefined,
    })
  })

  test('Check getCountryCode', () => {
    expect(globalFuncs.getCountryCode('uk', [{ country: 'uk', code: '+44' }])).toStrictEqual({ country: 'uk', code: '+44' })
  })

  test('- Check toCapitalise', () => {
    expect(globalFuncs.toCapitalise('Test')).toBe('Test')
    expect(globalFuncs.toCapitalise('TEST')).toBe('TEST')
    expect(globalFuncs.toCapitalise('test')).toBe('Test')
    expect(globalFuncs.toCapitalise('tEsT')).toBe('TEsT')
  })

  test('- Check getObjFromObj', () => {
    expect(globalFuncs.getObjFromObj({ entry: { default: {} } }, {})).toStrictEqual({ entry: {} })
  })

  test('- Check getTimelineActivityIcon', () => {
    expect(globalFuncs.getTimelineActivityIcon('ACCOUNT_CREATED')).toBe('account')
    expect(globalFuncs.getTimelineActivityIcon('ACCOUNT_ACTIVATED')).toBe('account')
    expect(globalFuncs.getTimelineActivityIcon('NOTIFICATION_PREFERENCE_UPDATED')).toBe('notification')
    expect(globalFuncs.getTimelineActivityIcon('ASSET_UPDATED')).toBe('assetModified')
    expect(globalFuncs.getTimelineActivityIcon('ASSET_UPDATED')).toBe('assetModified')
    expect(globalFuncs.getTimelineActivityIcon('ALERT_RESOLVED')).toBe('alertResolved')
    expect(globalFuncs.getTimelineActivityIcon('EMPLOYEE_INVITED')).toBe('employeeInvited')
    expect(globalFuncs.getTimelineActivityIcon('EMPLOYEE_DELETED')).toBe('employeeDeleted')
    expect(globalFuncs.getTimelineActivityIcon('ASSET_ADDED', 'company')).toBe('companyAssetAdded')
    expect(globalFuncs.getTimelineActivityIcon('')).toBe('account')
  })
})

describe('- sessionStorage functions', () => {
  test('- setStorageItem flavours behaviour indirect', () => {
    sessionStorageFuncs.setStorageItem('key', 'value')
    expect(window[sessionStorageFuncs?.storageType]?.getItem('key')).toBe('value')
    sessionStorageFuncs.clearStorage()

    sessionStorageFuncs.setStorageItem('key', 'value', 'sessionstorage')
    expect(window[sessionStorageFuncs?.storageType]?.getItem('key')).toBeNull()
    sessionStorageFuncs.clearStorage()

    sessionStorageFuncs.setStorageItem('key', 'undefined')
    expect(sessionStorageFuncs.getStorageItem('key')).toBeUndefined()
    sessionStorageFuncs.clearStorage()

    sessionStorageFuncs.setStorageItem('key', 'null')
    expect(sessionStorageFuncs.getStorageItem('key')).toBeNull()
    sessionStorageFuncs.clearStorage()

    sessionStorageFuncs.setStorageItem('key', 'true')
    expect(sessionStorageFuncs.getStorageItem('key')).toBeTruthy()
    sessionStorageFuncs.clearStorage()

    sessionStorageFuncs.setStorageItem('key', 'false')
    expect(sessionStorageFuncs.getStorageItem('key')).toBeFalsy()
    sessionStorageFuncs.clearStorage()
  })

  test('- setStorageItem flavours behaviour direct', () => {
    window[sessionStorageFuncs?.storageType].setItem('key', 'value')
    expect(sessionStorageFuncs.getStorageItem('key')).toBe('value')
    sessionStorageFuncs.clearStorage()

    window[sessionStorageFuncs?.storageType].setItem('key', 'value')
    expect(sessionStorageFuncs.getStorageItem('key', 'sessionstorage')).toBeFalsy()
    sessionStorageFuncs.clearStorage()
  })

  test('- deleteStorageItem flavours behaviour indirect', () => {
    sessionStorageFuncs.setStorageItem('key', 'value')
    sessionStorageFuncs.deleteStorageItem('key')
    expect(window[sessionStorageFuncs?.storageType].getItem('key')).toBeNull()
    sessionStorageFuncs.clearStorage()

    sessionStorageFuncs.setStorageItem('key', 'value')
    sessionStorageFuncs.deleteStorageItem('key', 'sessionstorage')
    expect(window[sessionStorageFuncs?.storageType].getItem('key')).toBe('value')
    sessionStorageFuncs.clearStorage()
    expect(window[sessionStorageFuncs?.storageType].getItem('key')).toBeNull()
    sessionStorageFuncs.setStorageItem('key', 'value')
    sessionStorageFuncs.clearStorage('sessionstorage')
    expect(window[sessionStorageFuncs?.storageType].getItem('key')).toBe('value')
  })

  test('- deleteStorageItem flavours behaviour direct', () => {
    window[sessionStorageFuncs?.storageType].setItem('key', 'value')
    window[sessionStorageFuncs?.storageType].removeItem('key')
    expect(sessionStorageFuncs.getStorageItem('key')).toBeFalsy()
    sessionStorageFuncs.clearStorage()
  })

  test('- storageAvailable flavours behaviour direct', () => {
    expect(sessionStorageFuncs.storageAvailable('sessionStorage')).toBeTruthy()
    expect(sessionStorageFuncs.storageAvailable('sessionstorage')).toBeFalsy()
    sessionStorageFuncs.clearStorage()
  })

  test('- test forceLogout', () => {
    expect(sessionStorageFuncs.forceLogout()).toBeUndefined()
  })

  test('- test requestCredentials', () => {
    expect(sessionStorageFuncs.requestCredentials()).toBeUndefined()
    sessionStorageFuncs.setStorageItem('key', 'value')
    expect(sessionStorageFuncs.requestCredentials()).toBeUndefined()
    sessionStorageFuncs.clearStorage()
  })

  test('- test onStorageUpdate', () => {
    const navigate = jest.fn()
    sessionStorageFuncs.onStorageUpdate({ key: 'REQUESTING_SHARED_CREDENTIALS' }, navigate)
    sessionStorageFuncs.onStorageUpdate({ key: 'CREDENTIALS_SHARING' })
    sessionStorageFuncs.onStorageUpdate({ key: 'CREDENTIALS_SHARING', newValue: JSON.stringify({ test: 'test' }) }, navigate)
    sessionStorageFuncs.setStorageItem('access_token', 'test')
    sessionStorageFuncs.onStorageUpdate({ key: 'CLEAR_CREDENTIALS' }, navigate)
    sessionStorageFuncs.clearStorage()
    sessionStorageFuncs.onStorageUpdate({ key: 'test' }, navigate)
    expect(sessionStorageFuncs.getStorageItem('CLEAR_CREDENTIALS')).toBeFalsy()
  })
})
