import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import getTimeline, { getTimelineAPI } from '.'
import * as timelineReducer from '../../reducers/timeline'

const errorResponse = 'PROTECTION_ERR_GENERIC_ALERT'

describe('- Get Timeline saga', () => {
  describe('- Get timeline saga', () => {
    const testActionPayload = {
      payload: {
        data: {},
      },
    }
    const successResponse = {
      data: {},
    }

    const fetchDataGenerator = cloneableGenerator(getTimeline)(testActionPayload)

    test('- Check for reducer call getAlerts', () => {
      expect(fetchDataGenerator.next().value)
        .toEqual(call(getTimelineAPI, { }))
    })

    test('- Check for reducer call of api response', () => {
      expect(fetchDataGenerator.next(successResponse).value)
        .toEqual(put(timelineReducer.setData(successResponse.data)))
    })

    test('- Check for reducer call of api Error response', () => {
      expect(fetchDataGenerator.throw({}).value)
        .toEqual(put(timelineReducer.setError(errorResponse)))
    })
  })
})
