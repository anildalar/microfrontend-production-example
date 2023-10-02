import { call, put } from 'redux-saga/effects'
import { updateSyncErrors } from 'redux-form'

import { businessLogic } from '../../../../constants/js/globalConstants'

export const validateCodeApi = (data) => businessLogic()
  .validateCodeAPI(data)

export default function* postValidateCode(action) {
  const { data, formData } = action?.payload
  try {
    const respons = yield call(validateCodeApi, data)
    if (respons?.data?.status?.toLowerCase() === 'invalid') {
      yield put(updateSyncErrors(formData?.formName, formData?.fieldError))
    }
  } catch (error) {
    yield put(updateSyncErrors(formData?.formName, formData?.fieldError))
  }
}
