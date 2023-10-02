import { initI18n } from '../../common-ui-app/src/app/utils/i18n'

const info = {
  lng: 'en-us',
  fallbackLang: 'en-us',
}
const languageResponse = {
  [info.lng]: {
    translation: {},
  },
}
const reactI18next = () => initI18n(languageResponse, info)

export default reactI18next
