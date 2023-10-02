/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import postAsset, { postAssetAPI } from '.'
import * as postAssetReducer from '../../../reducers/manageAssets/postAsset'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Post Asset saga', () => {
  describe('- Post Asset saga', () => {
    const testActionPayload = {
      payload: {},
    }

    const fetchDataGenerator = cloneableGenerator(postAsset)(testActionPayload)
    const successResponse = {
      data: {
      },
    }

    test('- Check for reducer call postAsset', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(postAssetAPI, {}))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(postAssetReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(postAssetReducer.setError(errorResponse)))
    })
  })
})
