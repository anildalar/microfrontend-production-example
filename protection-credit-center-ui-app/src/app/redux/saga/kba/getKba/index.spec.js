import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import getKba, { getKbaAPI } from '.'
import * as kbaReducer from '../../../reducers/kba'
import api from '../../../../utils/api'

const errorResponse = 'SME_ERR_GENERIC'

describe('- Get KBA saga', () => {
  describe('- Get KBA saga', () => {
    const successResponse = {
      data: {},
    }

    const fetchDataGenerator = cloneableGenerator(getKba)()

    test('- Check for reducer call getKba', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(getKbaAPI))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(kbaReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(kbaReducer.setError(errorResponse)))
    })

    test('- Check for API axios instance getKbaAPI call', () => {
      api.createAxiosInstance({})
      expect(getKbaAPI()).toBeInstanceOf(Promise)
    })
  })
})
