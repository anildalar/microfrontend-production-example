/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import updateNotifications, { updateNotificationsAPI } from '.'
import * as updateNotificationsReducer from '../../../reducers/notifications/updateNotifications'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Update notifications saga', () => {
  const testActionPayload = {
    payload: {},
  }

  const fetchDataGenerator = cloneableGenerator(updateNotifications)(testActionPayload)
  const successResponse = {
    data: {
    },
  }

  test('- Check for reducer call updateNotifications', () => {
    expect(fetchDataGenerator.next().value)
      .toEqual(call(updateNotificationsAPI, {}))
  })

  test('- Check for reducer call of api response', () => {
    expect(fetchDataGenerator.next(successResponse).value)
      .toEqual(put(updateNotificationsReducer.setData(successResponse.data)))
  })

  test('- Check for reducer call of api Error response', () => {
    expect(fetchDataGenerator.throw({}).value)
      .toEqual(put(updateNotificationsReducer.setError(errorResponse)))
  })
})
