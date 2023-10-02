import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const initI18n = (languageResponse, info, reactI18next = initReactI18next, callback) => {
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

const info = {
  lng: 'en-us',
  fallbackLang: 'en-us',
}
const languageResponse = {
  [info.lng]: {
    translation: {},
  },
}
initI18n(languageResponse, info)
const reactI18next = () => initI18n(languageResponse, info)

export default reactI18next
