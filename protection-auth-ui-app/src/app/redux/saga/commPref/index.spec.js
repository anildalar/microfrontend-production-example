import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import commPref, { commPrefAPI } from '.'
import * as commPrefReducer from '../../reducers/commPref'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Login saga', () => {
  describe('- postActivationSetPassword saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }

    const fetchDataGenerator = cloneableGenerator(commPref)(testActionPayload)
    const successResponse = {
      data: {},
    }

    test('- Check for reducer call commPref', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(commPrefAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(commPrefReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(commPrefReducer.setError(errorResponse)))
    })
  })
})
