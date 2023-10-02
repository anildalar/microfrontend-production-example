import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import solicitation, { solicitationAPI } from '.'
import * as solicitationReducer from '../../reducers/solicitation'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- solicitation saga', () => {
  describe('- postActivationSetPassword saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }

    const fetchDataGenerator = cloneableGenerator(solicitation)(testActionPayload)
    const successResponse = {
      data: {},
    }

    test('- Check for reducer call solicitation', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(solicitationAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(solicitationReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(solicitationReducer.setError(errorResponse)))
    })
  })
})
