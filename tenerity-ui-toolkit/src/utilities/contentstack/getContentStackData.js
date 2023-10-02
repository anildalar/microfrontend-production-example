import * as i18n from '../i18n'
import * as contenStackSDK from './SDK'

async function getContentStackData(configStoreData, requestData) {
  try {
    const { contentStack, locales, tenantId } = configStoreData
    const { contentId, pageId, componentId } = requestData
    const translationObj = i18n?.getI18nDataByLanguage(locales?.lng)?.translation
    
    if (!i18n?.default?.exists(`${pageId || componentId}`)) {
      const cmsData = await contenStackSDK.getContentStackEntryByTenant(
        {
          ...contentStack, tenantId,
        }, locales?.lng, contentId,
      )

      const {
        page_contents: pageContents = null,
        component_contents: componentsContents = null,
        translations = null,
      } = cmsData?.[0]?.[0] || {}

      const {
        page_links: pageLinks = null,
        page_translations: pageTranslations = null,
        component_translations: componentTranslations = null,
        components_links: componentLinks = null,
        api_errors = null,
      } = pageContents || componentsContents || translations || {}

      const reduceData = (arr, keyToPrepend) => arr?.reduce((acc, value) => ({
        ...acc,
        [`${keyToPrepend ? '_' : ''}${value?.key}`]: value?.value,
      }), {})

      i18n?.runTimeTranslations({
        ...translationObj,
        [pageId || componentId]: {
          ...(api_errors?.value?.reduce((acc, value) => ({
            ...acc,
            [value?.key]: value?.value,
          }), {})),
          ...(reduceData((pageTranslations || componentTranslations)?.value)),
          links: (pageLinks || componentLinks)?.reduce((acc, value, currentIndex) => ({
            ...acc,
            [`link_${currentIndex}`]: {
              text: value?.[pageLinks ? 'page_link' : 'component_link']?.title,
              href: value?.[pageLinks ? 'page_link' : 'component_link']?.href,
            },
          }), {}),
        },
      }, locales?.lng)
    }
    return []
  } catch (error) {
    throw new Error('Error')
  }
}

export default getContentStackData
