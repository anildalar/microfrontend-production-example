import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { global } from 'tenerity-ui-toolkit'

import getResetPasswordApproval, { getResetPasswordApprovalAPI } from '.'
import * as resetPasswordApprovalReducer from '../../reducers/resetPasswordApproval'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Activation saga', () => {
  describe('- getResetPasswordApproval saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }

    const fetchDataGenerator = cloneableGenerator(getResetPasswordApproval)(testActionPayload)

    test('- Check for reducer call getResetPasswordApproval', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(getResetPasswordApprovalAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(put(resetPasswordApprovalReducer.setData()))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(resetPasswordApprovalReducer.setError(errorResponse)))
    })

    test('- Check for API axios instance getResetPasswordApprovalAPI call', () => {
      global?.api?.createAxiosInstance({})
      expect(getResetPasswordApprovalAPI()).toBeInstanceOf(Promise)
    })
  })
})
