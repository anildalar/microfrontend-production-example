import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// get current translation language method
export const getI18nCurrentLanguage = () => i18n?.language

export const getI18nDataByLanguage = (lng) => i18n?.getDataByLanguage(lng)

// Change language method
export const changeLanguageRunTimeTranslation = (lng) => {
  const containsBundle = i18n.hasResourceBundle(lng, 'translation')
  const getLanguage = i18n.getDataByLanguage(lng)
  if (containsBundle && getLanguage) {
    i18n.changeLanguage(lng)
  }
}

// add Resources language method
export const addResourcesCallback = (lng, runTimeData) => {
  i18n.addResourceBundle(lng, 'translation', runTimeData?.translation)
  // i18n.addResources(lng, 'translation', runTimeData?.translation)
}

// use this to call and load data dynamically
export const getLanguageFromContentServer = (
  clientId,
  lng,
  isChangeLanguage,
  successCallBack,
  successOrFailCallback,
) => {
  const languageResponse = {
    [lng]: {
      translation: {},
    },
  }

  addResourcesCallback(lng, languageResponse?.[lng])
  if (isChangeLanguage) {
    changeLanguageRunTimeTranslation(lng)
  }
  if (typeof successCallBack === 'function') successCallBack(lng)
  if (typeof successOrFailCallback === 'function') successOrFailCallback(lng)
}

export const isTranslationExist = (lng, initialLoad = false) => {
  const containsBundle = initialLoad ? !initialLoad : i18n.hasResourceBundle(lng, 'translation')
  const getLanguage = initialLoad ? !initialLoad : i18n.getDataByLanguage(lng)
  const currentLanguage = i18n.language
  return {
    containsBundle, getLanguage, currentLanguage,
  }
}

export const runTimeTranslations = (runTimeData, lng) => {
  i18n.addResourceBundle(lng, 'translation', runTimeData, true, true)
  i18n.changeLanguage(lng)
}

// use this to call and load data dynamically if language is not available
export const getAndUpdateRunTimeTranslations = (
  clientId,
  lng,
  isChangeLanguage,
  successCallBack,
  successOrFailCallback,
) => {
  const { containsBundle, getLanguage } = isTranslationExist(lng)
  if (!containsBundle && !getLanguage) {
    getLanguageFromContentServer(
      clientId,
      lng,
      isChangeLanguage,
      successCallBack,
      successOrFailCallback,
    )
  }
}

export const initI18n = (languageResponse, info, reactI18next = initReactI18next, callback) => {
  i18n
    .use(reactI18next) // passes i18next down to react-i18next
    .init({
      resources: languageResponse,
      fallbackLng: info?.fallbackLng,
      lng: info?.lng, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      // you can use the i18next.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
      // if you're using a language detector, do not define the lng option
      lowerCaseLng: true,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      react: {
        // Turn off the use of React Suspense
        useSuspense: false,
      },
    }, callback)
}

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const initateI18n = (info, callback) => {
  const languageResponse = {
    [info.lng]: {
      translation: {},
    },
  }
  const { currentLanguage } = isTranslationExist(info.lng, true)
  if (currentLanguage !== (info?.lng)) {
    initI18n(languageResponse, info, initReactI18next, callback)
  } else {
    callback()
  }
}

export default i18n
