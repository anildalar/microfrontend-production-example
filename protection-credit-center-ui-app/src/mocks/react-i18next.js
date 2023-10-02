const reactI18next = jest.createMockFromModule('react-i18next')

reactI18next.initReactI18next = {
  type: '3rdParty',
  init: () => jest.fn(),
}
reactI18next.useTranslation = () => ({
  t: (str) => str,
  i18n: {
    changeLanguage: () => new Promise(() => { }),
  },
})
reactI18next.Trans = ({ children }) => children
reactI18next.withTranslation = () => (Component) => {
  // eslint-disable-next-line no-param-reassign
  Component.defaultProps = { ...Component.defaultProps, t: () => '' }
  return Component
}

export default reactI18next

// jest.mock('react-i18next', () => ({
//   initReactI18next: {
//     type: '3rdParty',
//     init: () => jest.fn(),
//   },
//   // this mock makes sure any components using the
//   // translate hook can use it without a warning being shown
//   useTranslation: () => ({
//     t: (str) => str,
//     i18n: {
//       changeLanguage: () => new Promise(() => { }),
//     },
//   }),
//   Trans: ({ children }) => children,
//   // this mock makes sure any components using the translate HoC receive the t function as a prop
//   withTranslation: () => (Component) => {
//     // eslint-disable-next-line no-param-reassign
//     Component.defaultProps = { ...Component.defaultProps, t: () => '' }
//     return Component
//   },
// }))
