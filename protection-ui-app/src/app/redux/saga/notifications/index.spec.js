import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import getNotifications, { getNotificationsAPI } from '.'
import * as notificationsReducer from '../../reducers/notifications'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Get Notifications saga', () => {
  describe('- Get notifications saga', () => {
    const successResponse = {
      data: {},
    }

    const fetchDataGenerator = cloneableGenerator(getNotifications)({
      payload: {
        data: {},
      },
    })

    test('- Check for reducer call notifications', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(getNotificationsAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(notificationsReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(notificationsReducer.setError(errorResponse)))
    })
  })
})
