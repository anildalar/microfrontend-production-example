import { all, takeLatest } from 'redux-saga/effects'
import sagaActions from '../actions'

import deleteAsset from './manageAssets/deleteAsset'
import getAssets from './manageAssets/getAssets'
import postAsset from './manageAssets/postAsset'
import updateAsset from './manageAssets/updateAsset'

export default function* rootSaga() {
  yield all([
    takeLatest(sagaActions.DELETE_ASSET, deleteAsset),
    takeLatest(sagaActions.GET_ASSETS, getAssets),
    takeLatest(sagaActions.POST_ASSET, postAsset),
    takeLatest(sagaActions.UPDATE_ASSET, updateAsset),
  ])
}
