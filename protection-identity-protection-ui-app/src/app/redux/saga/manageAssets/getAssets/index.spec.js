import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import getAsset, { getAssetAPI } from '.'
import * as manageAssetReducer from '../../../reducers/manageAssets'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Get Asset saga', () => {
  describe('- Get asset saga', () => {
    const successResponse = {
      data: {},
    }

    const fetchDataGenerator = cloneableGenerator(getAsset)({
      payload: {
        data: {},
      },
    })

    test('- Check for reducer call getAsset', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(getAssetAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(manageAssetReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(manageAssetReducer.setError(errorResponse)))
    })
  })
})
