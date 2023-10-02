/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import updateAsset, { updateAssetAPI } from '.'
import * as updateAssetReducer from '../../../reducers/manageAssets/updateAsset'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- update Asset saga', () => {
  const testActionPayload = {
    payload: {},
  }

  const fetchDataGenerator = cloneableGenerator(updateAsset)(testActionPayload)
  const successResponse = {
    data: {
    },
  }

  test('- Check for reducer call updateAsset', () => {
    expect(fetchDataGenerator.next().value)
      .toEqual(call(updateAssetAPI, {}))
  })

  test('- Check for reducer call of api response', () => {
    expect(fetchDataGenerator.next(successResponse).value)
      .toEqual(put(updateAssetReducer.setData(successResponse.data)))
  })

  test('- Check for reducer call of api Error response', () => {
    expect(fetchDataGenerator.throw({}).value)
      .toEqual(put(updateAssetReducer.setError(errorResponse)))
  })
})
