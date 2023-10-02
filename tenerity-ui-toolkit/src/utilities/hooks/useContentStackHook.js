import React from 'react'
import * as i18n from '../i18n'
import * as contenStackSDK from '../contentstack/SDK'
import useConfigStoreHook from './useConfigStoreHook'

const useContentStackHook = ({ contentId, pageId, componentId }) => {
  const { getConfigStoreData } = useConfigStoreHook()

  React.useEffect(() => {
    const { contentStack, locales, tenantId } = getConfigStoreData()
    const translationObj = i18n?.getI18nDataByLanguage(locales?.lng)?.translation
    const fetchContent = async () => {
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
        api_errors = null, success_messages = null,
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
          ...(success_messages?.value?.reduce((acc, value) => ({
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
      // console.log(i18n.getI18nDataByLanguage('en-us')?.translation)
    }

    if (!((pageId || componentId) in translationObj)) {
      fetchContent()
    }
  }, [getConfigStoreData, componentId, pageId, contentId])
}

export default useContentStackHook
