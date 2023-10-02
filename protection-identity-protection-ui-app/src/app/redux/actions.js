import * as deleteAssetReducer from './reducers/manageAssets/deleteAsset'
import * as manageAssetsReducer from './reducers/manageAssets'
import * as postAssetReducer from './reducers/manageAssets/postAsset'
import * as updateAssetReducer from './reducers/manageAssets/updateAsset'

const sagaActions = {
  DELETE_ASSET: `${deleteAssetReducer.deleteAssetCall.type}`,
  DELETE_ASSET_RESET: `${deleteAssetReducer.setReset.type}`,
  GET_ASSETS: `${manageAssetsReducer.getManageAssets.type}`,
  POST_ASSET: `${postAssetReducer.postAssetCall.type}`,
  POST_ASSET_RESET: `${postAssetReducer.setReset.type}`,
  UPDATE_ASSET: `${updateAssetReducer.updateAssetCall.type}`,
}

export default sagaActions
