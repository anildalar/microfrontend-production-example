/* eslint-disable no-nested-ternary */
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//  '/:baseName/:region'
const useNavigation = () => {
  const appConfig = useSelector((state) => state.appConfig)
  const matcher = appConfig?.data?.configStoreData?.supportedRegion?.matcher
  const pathName = matcher === 'pathname' ? (appConfig?.data?.configStoreData?.supportedRegion?.pathname === '/'
    ? '' : appConfig?.data?.configStoreData?.supportedRegion?.pathname && ((appConfig?.data?.configStoreData?.supportedRegion?.pathname?.lastIndexOf('/') + 1) === appConfig?.data?.configStoreData?.supportedRegion?.pathname?.length)
      ? appConfig?.data?.configStoreData?.supportedRegion?.pathname.slice(0, appConfig?.data?.configStoreData?.supportedRegion?.pathname.lastIndexOf('/')) || ''
      : appConfig?.data?.configStoreData?.supportedRegion?.pathname) || '' : ''

  const navigate = useNavigate()
  const navigation = (to, options) => navigate(`${pathName}${to}`, options)
  const pathWithBaseName = (to) => `${pathName}${to}`

  return {
    matcher, navigate, navigation, pathWithBaseName, baseName: pathName,
  }
}

export default useNavigation
