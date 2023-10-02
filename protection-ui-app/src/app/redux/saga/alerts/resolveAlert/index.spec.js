/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import resolveAlert, { resolveAlertAPI } from '.'
import * as resolveAlertReducer from '../../../reducers/alerts/resolveAlert'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- update Asset saga', () => {
  const testActionPayload = {
    payload: {},
  }

  const fetchDataGenerator = cloneableGenerator(resolveAlert)(testActionPayload)
  const successResponse = {
    data: {
    },
  }

  test('- Check for reducer call updateAsset', () => {
    expect(fetchDataGenerator.next().value)
      .toEqual(call(resolveAlertAPI, {}))
  })

  test('- Check for reducer call of api response', () => {
    expect(fetchDataGenerator.next(successResponse).value)
      .toEqual(put(resolveAlertReducer.setData(successResponse.data)))
  })

  test('- Check for reducer call of api Error response', () => {
    expect(fetchDataGenerator.throw({}).value)
      .toEqual(put(resolveAlertReducer.setError(errorResponse)))
  })
})
