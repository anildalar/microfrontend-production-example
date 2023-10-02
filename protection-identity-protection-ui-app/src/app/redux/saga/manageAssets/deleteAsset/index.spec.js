/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import deleteAsset, { deleteAssetAPI } from '.'
import * as deleteAssetReducer from '../../../reducers/manageAssets/deleteAsset'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- delete Asset saga', () => {
  const testActionPayload = {
    payload: {},
  }

  const fetchDataGenerator = cloneableGenerator(deleteAsset)(testActionPayload)
  const successResponse = {
    data: {
    },
  }

  test('- Check for reducer call deleteAsset', () => {
    expect(fetchDataGenerator.next().value)
      .toEqual(call(deleteAssetAPI, {}))
  })

  test('- Check for reducer call of api response', () => {
    expect(fetchDataGenerator.next(successResponse).value)
      .toEqual(put(deleteAssetReducer.setData(successResponse.data)))
  })

  test('- Check for reducer call of api Error response', () => {
    expect(fetchDataGenerator.throw({}).value)
      .toEqual(put(deleteAssetReducer.setError(errorResponse)))
  })
})
