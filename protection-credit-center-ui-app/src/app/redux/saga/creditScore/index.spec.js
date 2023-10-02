import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
// eslint-disable-next-line import/no-unresolved
import { global } from 'tenerity-ui-toolkit'

import doLogin, { loginAPI } from '.'
import * as loginReducer from '../../reducers/login'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Login saga', () => {
  describe('- postActivationSetPassword saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }

    const fetchDataGenerator = cloneableGenerator(doLogin)(testActionPayload)
    const successResponse = {
      data: {},
    }

    test('- Check for reducer call doLogin', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(loginAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(loginReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(loginReducer.setError(errorResponse)))
    })

    test('- Check for API axios instance loginAPI call', () => {
      global?.api?.createAxiosInstance({})
      expect(loginAPI()).toBeInstanceOf(Promise)
    })
  })
})
