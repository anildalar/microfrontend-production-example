export const storageType = 'sessionStorage'

const apiVersion = 'v1'
const bffAssetBase = 'sme-asset-bff/asset'
const bffAlertsBase = 'sme-asset-bff/alerts'
const bffMemberBase = 'sme-asset-bff/member'
const bffAuthBase = 'sme-asset-bff/auth'
const bffEmployeeBase = 'sme-asset-bff/employee'

export const apiSchema = {
  addAssets: `${bffAssetBase}/${apiVersion}`,
  alertsList: `${bffAlertsBase}/${apiVersion}/#member_id#`,
  decryptPrimaryDetails: `${bffMemberBase}/${apiVersion}/decryptPrimaryDetails`,
  deleteAsset: `${bffAssetBase}/${apiVersion}/#asset_id#`,
  forgotPassword: `${bffAuthBase}/${apiVersion}/resetPassword`,
  login: `${bffAuthBase}/${apiVersion}/login`,
  logout: `${bffAuthBase}/${apiVersion}/logout`,
  manageAssetList: `${bffAssetBase}/${apiVersion}/#member_id#`,
  memberActivate: `${bffMemberBase}/${apiVersion}/activate/#member_id#`,
  memberProfile: `${bffMemberBase}/${apiVersion}/profile/#member_id#`,
  memberValidate: `${bffMemberBase}/${apiVersion}/validate`,
  notifications: `${bffMemberBase}/${apiVersion}/notifications/#member_id#`,
  refreshToken: `${bffAuthBase}/${apiVersion}/refreshToken`,
  resetPassword: `${bffAuthBase}/${apiVersion}/changePassword`,
  resetPasswordVerify: `${bffAuthBase}/${apiVersion}/verifyPasswordLink`,
  resolveAlert: `${bffAlertsBase}/${apiVersion}/status`,
  updateAsset: `${bffAssetBase}/${apiVersion}/#asset_id#`,
  timeline: `${bffMemberBase}/${apiVersion}/timeline/#member_id#`,
  postEmployee: `${bffEmployeeBase}/${apiVersion}/#member_id#`,
  deleteEmployee: `${bffEmployeeBase}/${apiVersion}/#member_id#`,
  getEmployees: `${bffEmployeeBase}/${apiVersion}/#membership_id#`,
}

export const headers = {
  Pragma: 'no-cache',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
}

export const idleTimeOut = 900000
export const snackBarTimeOut = 3000

export const storageKeys = {
  member_id: 'memberId',
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  membership_id: 'membership_id',
  REQUESTING_SHARED_CREDENTIALS: 'REQUESTING_SHARED_CREDENTIALS',
  CLEAR_CREDENTIALS: 'CLEAR_CREDENTIALS',
  CREDENTIALS_SHARING: 'CREDENTIALS_SHARING',
}
