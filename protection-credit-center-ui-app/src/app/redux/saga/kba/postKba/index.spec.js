/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import postKba, { postKbaAPI } from '.'
import * as postKbaReducer from '../../../reducers/kba/postKba'
import api from '../../../../utils/api'

const errorResponse = 'SME_ERR_GENERIC'

describe('- Post KBA saga', () => {
  describe('- Post KBA saga', () => {
    const testActionPayload = {
      payload: {},
    }

    const fetchDataGenerator = cloneableGenerator(postKba)(testActionPayload)
    const successResponse = {
      data: {
      },
    }

    test('- Check for reducer call postKba', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(postKbaAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(postKbaReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(postKbaReducer.setError(errorResponse)))
    })

    test('- Check for API axios instance postKbaAPI call', () => {
      api.createAxiosInstance({})
      expect(postKbaAPI()).toBeInstanceOf(Promise)
    })
  })
})
