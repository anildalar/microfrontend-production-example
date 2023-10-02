/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { global } from 'tenerity-ui-toolkit'

import postForgotPassword, { forgotPasswordAPI } from '.'
import * as forgotPassword from '../../reducers/forgotPassword'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Forgot Password saga', () => {
  describe('- post Forgot Password saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }

    const fetchDataGenerator = cloneableGenerator(postForgotPassword)(testActionPayload)
    const successResponse = {
      data: {},
    }

    test('- Check for reducer call postForgotPassword', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(forgotPasswordAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(forgotPassword.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(forgotPassword.setError(errorResponse)))
    })

    test('- Check for API axios instance forgotPasswordAPI call', () => {
      global?.api?.createAxiosInstance({})
      expect(forgotPasswordAPI()).toBeInstanceOf(Promise)
    })
  })
})
