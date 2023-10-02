import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import otpCall, { postOtpAPI } from '.'
import * as loginReducer from '../../reducers/login'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- OTP saga', () => {
  const testActionPayload = {
    payload: {
      data: {},
    },
  }

  const fetchDataGenerator = cloneableGenerator(otpCall)(testActionPayload)
  const successResponse = {
    data: {},
  }

  test('- Check for reducer call otpCall', () => {
    expect(fetchDataGenerator.next().value)
      .toEqual(call(postOtpAPI, {}))
  })

  test('- Check for reducer call of api response', () => {
    expect(fetchDataGenerator.next(successResponse).value)
      .toEqual(put(loginReducer.setData(successResponse.data)))
  })

  test('- Check for reducer call of api Error response', () => {
    expect(fetchDataGenerator.throw({}).value)
      .toEqual(put(loginReducer.setError(errorResponse)))
  })
})
