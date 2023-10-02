/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { global } from 'tenerity-ui-toolkit'

import postResetPassword, { postResetPasswordAPI } from '.'
import * as resetPasswordReducer from '../../reducers/resetPassword'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Activation saga', () => {
  describe('- postResetPassword saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }

    const fetchDataGenerator = cloneableGenerator(postResetPassword)(testActionPayload)
    const successResponse = {
      data: {
        status: 'success',
      },
    }

    test('- Check for reducer call postResetPassword', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(postResetPasswordAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(resetPasswordReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(resetPasswordReducer.setError(errorResponse)))
    })

    test('- Check for API axios instance postResetPasswordAPI call', () => {
      global?.api?.createAxiosInstance({})
      expect(postResetPasswordAPI()).toBeInstanceOf(Promise)
    })
  })
})
