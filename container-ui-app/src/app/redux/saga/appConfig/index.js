/* istanbul ignore file */
/* eslint-disable max-len */
import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { global, contentStackSDK } from 'tenerity-ui-toolkit'
import {
  envDelimeter, getDefaultRegionUrl, prodENV,
} from '../../../../../devtool-config/constants/const.config'
import { setData, setError } from '../../reducers/appConfig'

export const getAppConfigs = () => {
  const response = axios.get(`${window.location.protocol !== ('https:') ? window?.CONTAINER_UI_URL : window.location.origin}/configs/buildConfig.json`)
  return response
}

/* istanbul ignore next */
export const getConfigStore = (payload) => {
  // eslint-disable-next-line no-param-reassign
  let response = {}
  response = axios.get(`${payload.configStoreUrl
    .replace('#client_id#', payload.clientId)
    .replace('#client_env#.', payload.env !== prodENV ? `${payload.env}${envDelimeter}` : '')
    .replace('#client_env#', payload.env || prodENV)
    .replace('api.stage.', 'ng-api-us.stage-') // TODO: will reomve this later with headers
  }`, {
    headers: {
      'Tenant-Id': 600012,
    },
  })
  return response
}

export const getThemeArtifactsData = async (payload) => {
  const { configStoreData } = payload
  const { contentStack, locales } = configStoreData

  const branding = await contentStackSDK.getContentStackEntryByTenant(
    {
      ...contentStack,
    }, locales?.lng, 'protection_web_app_branding_v1',
  )
  const artifacts = await contentStackSDK.getContentStackEntryByTenant(
    {
      ...contentStack,
    }, locales?.lng, 'protection_web_app_artifacts_v1',
  )

  // eslint-disable-next-line camelcase
  const { app_icons, side_menu_icons } = artifacts?.[0]?.[0] || {}
  const { theme } = branding?.[0]?.[0] || {}
  const themeBreakpoints = theme?.breakpoints?.values
  const themePalette = theme?.palette?.find((o) => o?.colors?.mode === 'light') || theme?.palette[0]
  const actionColors = global?.utils?.getCMSKeysInCamelCasedFormat(themePalette?.action)
  /* Create object for all Icons */
  const appIcons = global?.utils?.getIcons(app_icons)
  const sideMenuIcons = global?.utils?.getIcons(side_menu_icons)

  /* Typography */
  const typography = theme?.typography.reduce((acc, val) => ({
    ...acc,
    [val?.type]: {
      ...global?.utils?.getCMSKeysInCamelCasedFormat(val),
      ...val?.responsive_typography?.reduce((accRes, res) => ({
        ...accRes,
        [`@media (max-width: ${themeBreakpoints[res?.breakpoint]}px)`]: {
          ...global?.utils?.getCMSKeysInCamelCasedFormat(res),
        },
      }), {}),
    },
  }), {})

  return {
    ...theme,
    fonts: global?.utils?.getCMSKeysInCamelCasedFormat(theme?.fonts),
    palette: {
      ...themePalette,
      ...themePalette?.colors,
      action: actionColors,
      charts: themePalette?.charts?.reduce((acc, current) => ({
        ...acc,
        [current?.type?.toLowerCase()]: current?.color,
      }), {}),
    },
    typography,
    artifacts: {
      appIcons: appIcons?.lightFile,
      appIconsDisabled: appIcons?.disabledFile,
      appIconsSmall: appIcons?.smallIconFile,
      sideMenuIcons: sideMenuIcons?.lightFile,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '2.5rem',
            minWidth: '75px',
            '&.MuiButton-contained': {
              color: '#FFFFFF',
              backgroundColor: '#e82d8a',
              boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#d3217a',
                boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
              },
              '&:active': {
                backgroundColor: '#b11664',
                boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
              },
              '&.Mui-disabled': {
                backgroundColor: '#e0e0e0',
                color: '#696969',
                boxShadow: 'none',
                pointerEvents: 'unset',
                cursor: 'not-allowed',
              },
              '&.Mui-focusVisible': {
                outline: `1px solid ${actionColors?.hover}`,
              },
            },
            '&.MuiButton-text': {
              color: actionColors?.active,
              textTransform: 'inherit',
              backgroundColor: 'transparent',
              '&.Mui-disabled': {
                color: actionColors?.disabled,
                boxShadow: 'none',
                pointerEvents: 'unset',
                cursor: 'not-allowed',
              },
              '&.Mui-focusVisible': {
                outline: `1px solid ${actionColors?.hover}`,
              },
            },
            '&.MuiButton-outlined': {
              color: '#e82d8a',
              backgroundColor: 'transparent',
              border: '1px solid #e82d8a',
              '&:hover': {
                color: '#d3217a',
                border: '2px solid #d3217a',
              },
              '&:active': {
                color: '#b11664',
                border: '2px solid #b11664',
              },
              '&.Mui-disabled': {
                backgroundColor: '#FFFFFF',
                color: '#696969',
                border: '1px solid #696969',
                boxShadow: 'none',
              },
              '&.Mui-focusVisible': {
                outline: `1px solid ${actionColors?.hover}`,
              },
            },

            '&.MuiButton-sizeLarge': {
              ...typography?.button,
              height: '42px',
              padding: '0 18px',
              [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
                ...typography?.buttonM,
                height: '36px',
                padding: '0 16px',
              },
            },
            '&.MuiButton-sizeMedium': {
              ...typography?.buttonM,
              height: '36px',
              padding: '0 16px',
              [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
                ...typography?.buttonS,
                height: '30px',
                padding: '0 12px',
              },
            },
            '&.MuiButton-sizeSmall': {
              ...typography?.buttonS,
              height: '30px',
              padding: '0 12px',
            },
          },
        },
        defaultProps: {
          disableRipple: true,
          size: 'large',
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            '&.MuiFab-primary': {
              color: '#FFFFFF',
              backgroundColor: '#e82d8a',
              boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#d3217a',
                boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
              },
              '&:active': {
                backgroundColor: '#b11664',
                boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
              },
              '&.Mui-disabled': {
                backgroundColor: '#e0e0e0',
                color: '#696969',
                boxShadow: 'none',
                pointerEvents: 'unset',
                cursor: 'not-allowed',
              },
              '&.Mui-focusVisible': {
                outline: `1px solid ${actionColors?.hover}`,
              },
            },
            '&.MuiFab-text': {
              color: actionColors?.active,
              textTransform: 'inherit',
              backgroundColor: 'transparent',
              '&.Mui-disabled': {
                color: actionColors?.disabled,
                boxShadow: 'none',
                pointerEvents: 'unset',
                cursor: 'not-allowed',
              },
              '&.Mui-focusVisible': {
                outline: `1px solid ${actionColors?.hover}`,
              },
            },
          },
        },
        defaultProps: {
          disableRipple: true,
          size: 'large',
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: '#e82d8a',
            textDecorationColor: '#e82d8a',
            '&[disabled]': {
              color: themePalette?.text?.disabled,
              textDecorationColor: themePalette?.text?.disabled,
              cursor: 'no-drop',
              pointerEvents: 'none',
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          arrow: {
            color: themePalette?.colors?.primary?.dark,
          },
          tooltip: {
            backgroundColor: themePalette?.colors?.primary?.dark,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 4px -2px rgba(16, 24, 40, 0.06), 0 4px 8px -2px rgba(16, 24, 40, 0.1)',
            '& input': {
              padding: '1rem 0.75rem',
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            paddingLeft: '1.67rem',
            paddingRight: '1.67rem',
            '&.Mui-selected': {
              borderRight: '6px solid',
              borderRightColor: '#e82d8a',
            },
            '&:hover': {
              background: '#f5faff',
            },
          },
        },
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 0,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: '#696969',
            '&.Mui-selected': {
              color: '#782eeb',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-indicator': {
              backgroundColor: '#782eeb',
              color: '#782eeb',
            },
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'transparent',
            },
            '& .MuiDataGrid-row': {
              border: '1px solid #eeeeee',
            },
            '& .MuiDataGrid-columnHeader': {
              padding: '0 1.5rem',
            },
            '& .MuiDataGrid-cell': {
              paddingLeft: '1.5rem',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              ...typography?.body2,
            },
            '& .MuiTablePagination-selectIcon': {
              color: themePalette?.text?.secondary,

            },
            '& .MuiTablePagination-select, .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
              ...typography?.overline,
              color: themePalette?.text?.secondary,
            },
            '& .MuiDataGrid-sortIcon': {
              color: themePalette?.text?.secondary,
            },
            '& .MuiDataGrid-cellContent': {},
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            ...typography?.caption,
            minWidth: '6.625rem',
            maxWidth: '100%',
            '&.Mui-disabled': {
              opacity: 1,
              color: themePalette?.text.disabled,
            },
            '&.MuiChip-filledWarning': {
              backgroundColor: themePalette?.colors?.warning?.light,
            },
            '&.MuiChip-filledError': {
              backgroundColor: themePalette?.colors?.error?.light,
            },
            '&.MuiChip-filledSuccess': {
              backgroundColor: themePalette?.colors?.success?.light,
            },
            '&.MuiChip-filledPrimary': {
              backgroundColor: themePalette?.colors?.primary?.light,
            },
            '&.MuiChip-filledDefault': {
              backgroundColor: actionColors?.disabledBackground,
            },
          },
          colorError: {
            color: themePalette?.colors?.error?.dark,
          },
          colorWarning: {
            color: themePalette?.colors?.warning?.dark,
          },
          colorSuccess: {
            color: themePalette?.colors?.success?.dark,
          },
          colorPrimary: {
            color: themePalette?.colors?.primary?.dark,
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            '.MuiTableCell-root': {
              borderBottom: '0',
              padding: '0.4rem 1.5rem',
            },
            '.MuiTableRow-root:not(:last-child, .detailsRow)': {
              borderBottom: `1px solid ${actionColors?.disabledBackground}`,
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '.MuiTableCell-root': {
              borderBottom: '0',
              padding: '0.8rem 1.5rem',
            },
            '.MuiTableRow-root': {
              borderBottom: `1px solid ${actionColors?.disabledBackground}`,
            },
            '.columnHeaderTitle': {
              ...typography?.body2,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            '&.MuiAlert-standardSuccess': {
              backgroundColor: themePalette?.colors?.success?.light,
              color: themePalette?.colors?.success?.dark,
            },
            '&.MuiAlert-standardInfo': {
              backgroundColor: themePalette?.colors?.info?.light,
              color: themePalette?.colors?.info?.dark,
            },
            '&.MuiAlert-standardWarning': {
              backgroundColor: themePalette?.colors?.warning?.light,
              color: themePalette?.colors?.warning?.dark,
            },
            '&.MuiAlert-standardError': {
              backgroundColor: themePalette?.colors?.error?.light,
              color: themePalette?.colors?.error?.dark,
            },
          },
        },
      },
    },
    customStyle: {
      pageLayout: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        maxHeight: 'auto',
        paddingBottom: '24px',
      },
      creditCenter: {
        creditUpdateInfo: {
          display: 'flex', pb: '1rem', gap: '1rem',
        },
        creditScorePinningStatus: {
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2rem',
        },
        container: {
          display: 'flex',
          justifyContent: 'space-between',
          minWidth: '40rem',
          flexWrap: 'no-wrap',
          textAlign: 'center',
        },
        credRiskometerItem: {
          width: '11.87rem',
        },
        credScoreRiskometerItem: {
          width: '13.75rem',
        },
        credReportsRiskometerItem: {
          width: '15.75rem',
        },
        creditReports: {
          accordionArrowIcon: { fill: themePalette?.text?.primary, stroke: themePalette?.text?.primary },
          accordionArrowDesktopIcon: { width: '46px', height: '46px' },
          accordionArrowMobileIcon: { width: '36px', height: '36px' },
          accordionStyle: { m: '1rem 0 0 0', borderRadius: '0.5rem' },
          accordionDesktopStyle: { p: '1.281rem 0' },
          accordionMobileStyle: { p: '0' },
          accordionSummaryStyle: { p: '0 1.875rem' },
        },
      },
      smallSecContainer: {
        padding: '3.75rem 3.23rem',
        margin: 'auto',
        borderRadius: '16px',
        boxShadow: '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
        textAlign: 'center',
        maxWidth: '500px !important',
        [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
          padding: '2.5rem 1.5rem',
        },
      },
      trialTerm: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: '2.6875rem',
      },
      tabPaper: {
        borderRadius: '1rem 1rem 0 0',
        boxShadow: '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
      },
      tabContentPaper: {
        borderRadius: '0 0 1rem 1rem',
        boxShadow: '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
        minHeight: 'inherit',
      },
      loaderStyle: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'inherit', flexDirection: 'column',
      },
      loaderTextStyle: {
        color: themePalette?.colors?.primary?.main,
        textTransform: 'uppercase',
        margin: '2.9rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'inherit',
        padding: '1rem',
      },
      phoneNumber: {
        noRightBorder: {
          fieldset: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          'input.MuiAutocomplete-input': { textOverflow: 'unset' },
        },
        noLeftBorder: {
          fieldset: {
            borderLeft: 'none',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        },
      },
      alertCenterCard: {
        containerStyle: {
          flexGrow: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '20px',
          padding: '1.8rem 1rem',
          borderRadius: '0.75rem',
          width: '100%',
        },
        sourceIconStyle: {
          width: '0.875rem',
          height: '1.25rem',
        },
        recommendationIconStyle: {
          width: '1.5rem',
          height: '1.25rem',
          marginLeft: '0.625rem',
        },
        resolvedIconStyle: {
          width: '1.25rem',
          height: '1.25rem',
        },
      },
      alertCenter: {
        layoutStyle: {
          justifyContent: 'start',
          alignItems: 'flex-start',
        },
        containerStyle: {
          margin: '0', textAlign: 'left',
        },
        headingStyle: {
          mb: '3rem',
          mt: '3rem',
        },
        subHeadingStyle: {
          mb: '1.43rem',
        },
        subHeadingStyle2: {
          mb: '2.5rem',
        },
      },
      identityInfo: {
        layoutStyle: {
          justifyContent: 'start',
          alignItems: 'flex-start',
        },
        containerStyle: {
          margin: '0',
          textAlign: 'left',
        },
        headingStyle: {
          mb: '3rem',
          mt: '3rem',
        },
        subHeadingStyle: {
          mb: '1.43rem',
        },
        subHeadingStyle2: {
          mb: '2.5rem',
        },
      },
      resetPasswordNote: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      autoCompletePhone: {
        width: '1.375rem',
        height: '0.937rem',
        marginRight: '0.625rem',
      },
      scrollbarStyle: {
        '::-webkit-scrollbar': {
          width: '10px',
        },
        '::-webkit-scrollbar-track': {
          background: '#edeff4',
        },
        '::-webkit-scrollbar-thumb': {
          width: '5px',
          background: '#a7a7a7',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#a7a7a7',
        },
      },
      tabs: {
        tabStyle: {
          '&.MuiButtonBase-root': {
            ...typography?.h6,
            letterSpacing: 0.5,
          },
        },
        icons: {
          width: '1.5rem',
          height: '1.5rem',
        },
        inputStyle: {
          pb: '1rem',
        },
      },
      alertStyle: {
        mb: '2rem',
        textAlign: 'left',
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectStyle: {
        whiteSpace: 'pre-wrap',
        maxWidth: { xs: '100%' },
        textAlign: 'left',
      },
      checkBoxStyle: {
        fontSize: '1.125rem',
        alignItems: 'flex-start',
      },
      formControlLabel: {
        textAlign: 'left',
        marginLeft: '0.66rem',
      },
      registration: {
        container: {
          pt: '3.937rem', maxWidth: '44.625rem', textAlign: 'center',
        },
        inputPadding: {
          pb: '1.5rem',
        },
        dividerStyle: {
          mb: '1.5rem',
        },
        buttonSectionStyle: {
          pt: '2.5rem',
          mb: '7.125rem',
        },
        ssnInputStyle: {
          width: {
            xs: '100%',
            md: '17.5rem',
          },
        },
        sectionHeading: { pb: '0.9375rem' },
      },
      sideNavBar: {
        icon: {
          mr: '1.12rem',
        },
        svg: {
          width: '1.25rem',
          height: '1.25rem',
        },
        drawerStyle: {
          width: '280px',
          position: 'sticky',
          maxHeight: 'calc(100vh - 70px)',
          overflow: 'auto',
          top: '70px',
        },
      },
      radioGroup: {
        '& .MuiSvgIcon-root': {
          height: 20,
          width: 20,
          ml: '0.625rem',
          color: themePalette?.colors?.primary?.main,
        },
      },
      dashboardContainer: {
        alignItems: 'start',
        pt: '2.5rem',
      },
      kba: {
        dividerStyle: {
          mb: '1.9375rem',
        },
        radioGroupContainer: {
          mb: '0.9375rem',
        },
        gridItem: {
          pl: '1rem',
        },
      },
      assetFormDataContainer: {
        gap: '1.5rem',
        padding: '2rem 1.25rem',
        textAlign: 'left',
      },
      emptyDataGridView: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: themePalette?.text?.disabled,
      },
      numberInput: {
        default: {
          '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
            display: 'none', // Hide default browser increment and decrement buttons
          },
        },
        endAdornment: {
          position: 'absolute',
          right: '6px',
        },
        icon: {
          height: '1.375rem',
          width: '1.375rem',
          cursor: 'pointer',
        },
      },
      failureMessage: {
        trialMessage: {
          fontWeight: '500',
        },
        icons: {
          margin: '0 12px 0 0',
        },
        ciInfoMessagesWrapper: {
          textAlign: 'center',
        },
        identityInfoMessage: {
          fontWeight: 'normal', display: 'block',
        },
        divider: {
          height: '1px', width: '100%',
        },
      },
      alertListContainer: {
        width: '100%', overflow: 'auto', display: 'table', tableLayout: 'fixed', minHeight: 'inherit',
      },
      dashboard: {
        corousel: {
          width: {
            xs: '17rem',
            sm: '27rem',
            md: '27rem',
            lg: '43.625rem',
            xl: '66.625rem',
          },
          margin: '1.75rem auto 0',
          padding: '0rem 0.5rem',
        },
      },
      accountCard: {
        container: {
          width: '10.6rem',
          height: '6.9rem',
          flexGrow: 0,
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem',
          borderRadius: '0.38rem',
          backgroundColor: themePalette?.background?.default,
        },
        header: {
          fontSize: '1rem',
          fontWeight: 500,
          color: themePalette?.text?.primary,
        },
        details: {
          fontSize: '0.875rem',
          color: themePalette?.action?.active,
        },
        icon: {
          width: '2rem',
          height: '2rem',
          flexGrow: 0,
          objectFit: 'contain',
        },
      },
      resetPassword: {
        heading: {
          pb: '2.87rem',
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            pb: '2rem',
          },
        },
        button: {
          mb: '3.75rem',
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            mt: '2rem',
            mb: 0,
          },
        },
        textInput: {
          pb: '2rem',
        },
      },
      forgotPassword: {
        common: {
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            pb: '2rem',
          },
        },
        heading: {
          pb: '4.06rem',
        },
        subHeading: {
          px: '1.900rem',
          pb: '2rem',
        },
        textInput: {
          pb: '2rem',
          textAlign: 'center',
        },
        button: {
          p: 0,
          pb: '2.375rem',
        },
      },
      fullPageError: {
        common: {
          marginBottom: '3rem',
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            marginBottom: '2.25rem',
          },
        },
      },
      header: {
        appBar: {
          px: '1.25rem',
          justifyContent: 'center',
          boxShadow: `0 0 0 0.25rem ${theme.palette?.action?.active}`,
          marginBottom: '0.25rem',
          height: 70,
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            height: 64,
            px: '0.5rem',
          },
        },
        menuIcon: {
          width: '1.125rem',
          height: '0.75rem',
          flexGrow: 0,
          objectFit: 'contain',
        },
        clientIcon: {
          width: '12rem',
          height: '3rem',
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            width: '6rem',
            height: '4rem',
          },
        },
      },
      footer: {
        divider: {
          backgroundColor: themePalette?.colors?.primary?.contrastText,
          height: '0.675rem',
          width: '0.075rem',
        },
        gridContainer1: {
          py: 4,
          gap: 2,
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            flexDirection: 'column',
            py: 3.25,
            px: 2.75,
          },
        },
        gridContainer2: {
          gap: 4,
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            gap: 0.75,
          },
        },
        gridContainer3: {
          gap: 2,
          [`@media (max-width: ${themeBreakpoints?.md}px)`]: {
            gap: 1,
          },
        },
        link: {
          textDecoration: 'underline',
          color: themePalette?.background?.paper,
        },
        copyRight: {
          minWidth: '100%',
        },
      },
    },
  }
}

export const getWebFormData = async (payload) => {
  const { configStoreData } = payload
  const { contentStack, locales } = configStoreData

  const formFields = await contentStackSDK.getContentStackEntryByTenant(
    {
      ...contentStack,
    }, locales?.lng, 'protection_web_app_form_fields_v1',
  )
  const formFieldsData = formFields?.[0]?.[0]

  return Object.keys(formFieldsData)?.reduce((acc, key) => {
    if (formFieldsData[key]?.value) {
      acc[key] = formFieldsData[key]?.value?.reduce((o, value) => ({
        ...o,
        [value.key]: value?.value,
      }), {})
    }
    return acc
  }, {})
}

const getRegionData = (regionDataMatcherByPathName, regionDataMatcherByHostName, regionUrl) => regionDataMatcherByPathName?.find((regionsObj) => {
  const windowPathName = window?.location?.pathname?.lastIndexOf('/') + 1 === window?.location?.pathname?.length
    ? window?.location?.pathname?.slice(0, window?.location?.pathname.lastIndexOf('/')) : window?.location?.pathname
  const regionPathName = (regionsObj?.supportedRegion?.pathname?.lastIndexOf('/') + 1 === regionsObj?.supportedRegion?.pathname?.length)
    ? regionsObj?.supportedRegion?.pathname?.slice(0, regionsObj?.supportedRegion?.pathname?.lastIndexOf('/')) : regionsObj?.supportedRegion?.pathname
  return windowPathName?.includes(regionPathName)
}) || regionDataMatcherByHostName?.find((regionsObj) => regionUrl === regionsObj?.supportedRegion?.hostname)

// eslint-disable-next-line no-unused-vars
const reduceData = (responseAppConfigs, responseConfigStore) => {
  let configStoreData = responseConfigStore?.data || {}

  // Default region to run application for Protection uk dev
  // Change the value to run any other region
  if (configStoreData?.regions) {
    const { regions, urlPattern } = configStoreData
    if (regions.length > 0) {
      const currentRegion = window.location.protocol !== ('https:')
        ? getDefaultRegionUrl(responseAppConfigs.data.env, urlPattern) : window.location.host

      const regionDataMatcherByPathName = regions.filter((regionsObj) => regionsObj?.supportedRegion?.matcher === 'pathname')
      const regionDataMatcherByHostName = regions.filter((regionsObj) => regionsObj?.supportedRegion?.matcher === 'hostname')

      const regionData = getRegionData(regionDataMatcherByPathName, regionDataMatcherByHostName, currentRegion)
      configStoreData = { ...configStoreData, ...regionData }
    }
    delete configStoreData.regions
  }

  const entireResponse = {
    appConfigData: responseAppConfigs.data,
    configStoreData,
  }
  return entireResponse
}

export function* fetchDataSaga() {
  try {
    const responseAppConfigs = yield call(getAppConfigs)
    let entireResponse = reduceData(responseAppConfigs, {})
    const responseConfigStore = yield call(getConfigStore, responseAppConfigs.data)
    entireResponse = reduceData(responseAppConfigs, responseConfigStore)

    const responseThemeArtifactsData = yield call(getThemeArtifactsData, entireResponse)
    const responseFormFieldsData = yield call(getWebFormData, entireResponse)

    const solicitationRespData = { // solicitationRespData will come from actual API
      // benefits: [],
      benefits: [
        { type: 'identity' },
        { type: 'credit' },
      ],
    }
    const { benefits } = solicitationRespData
    entireResponse = {
      ...entireResponse,
      themeConfigData: responseThemeArtifactsData,
      formFieldsData: responseFormFieldsData,
      benefits,
    }
    yield put(setData(entireResponse))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_ERR_')))
  }
}
