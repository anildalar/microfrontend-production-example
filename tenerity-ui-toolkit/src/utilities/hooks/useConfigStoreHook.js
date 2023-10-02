import { useSelector } from 'react-redux'

const useConfigStoreHook = () => {
  const appConfig = useSelector((state) => state?.appConfig || {})
  const getLoadingStatus = () => appConfig?.isLoading
  const getAppConfigError = () => appConfig?.error

  const getConfigStoreData = () => appConfig?.data?.configStoreData || {}
  const getAppConfigData = () => appConfig?.data?.appConfigData || {}
  const getThemeConfigData = () => appConfig?.data?.themeConfigData || {}
  const getWebFormData = () => appConfig?.data?.formFieldsData || {}

  const getFeatures = () => getConfigStoreData()?.features || {}
  const getOneTrust = () => getFeatures()?.oneTrust || {}

  const getApiSchema = (endPoint) => getConfigStoreData()?.apiSchema?.[endPoint]
    || getConfigStoreData()?.apiSchema || {}

  const getStorageKeys = () => getConfigStoreData()?.storageKeys || {}
  const getBenefits = () => {
    const benefits = {};
    (appConfig?.data?.benefits || [])?.forEach((i) => { benefits[i.type] = !!i.type })
    return benefits
  }

  // const getMatomo = () => getFeatures()?.matomo || {}
  // const getChatBot = () => getFeatures()?.chatBot || {}
  // const getContentStackConfig = () => getFeatures()?.contentStack || {}

  // const getTenantInfo = () => getConfigStoreData()?.tenantInfo || {}

  // const getLanguages = () => getConfigStoreData()?.languages || {}
  // const getLocales = (lang) => getLanguages()?.locales?.[lang] || getLanguages()?.locales || {}
  // const getSupportedLanguages = () => Object.keys(getLocales()) || []
  // const getLocaleResources = () => getSupportedLanguages()?.map((locale) => ({
  //   label: getLocales(locale)?.name?.toUpperCase(),
  //   value: locale,
  // })) || []
  // const getPreferredLang = () => {
  //   const defaultLng = getTenantInfo()?.lng
  //   const _data = JSON.parse(localStorage.getItem("persist:root"));
  //   const memberData = _data?.Member ? JSON.parse(_data?.Member) : {};
  //   return memberData?.preferredLanguage || defaultLng
  // }
  // const getContentStackLocale = (locale) => getLocales(locale)?.contentStack

  // const getConfigs = () => getConfigStoreData()?.configs || {}
  // const getBenefitsConfig = () => getConfigs()?.BENEFITS_CONFIG || {}
  // const getApiConfig = () => getConfigs()?.API_CONFIG || {}
  // const getLayoutConfig = () => getConfigs()?.LAYOUT_CONFIG || {}

  return {
    appConfig,
    getConfigStoreData,
    getAppConfigData,
    getFeatures,
    getOneTrust,
    getLoadingStatus,
    getAppConfigError,
    getThemeConfigData,
    getWebFormData,
    getApiSchema,
    getStorageKeys,
    getBenefits,
  }
}

export default useConfigStoreHook
