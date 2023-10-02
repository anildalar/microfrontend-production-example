/* eslint-disable import/no-unresolved */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { getContentStackData as getContentStackDataHook } from 'tenerity-ui-toolkit'
import { Loadable, AuthGuardRoute, PublicRoute } from 'COMMON_UI/common/Components'
import { FullPageError, GenericErrorPage, Maintenance } from 'COMMON_UI/common/Pages'

const Kba = Loadable(React.lazy(() => import('../Pages/Kba')))
const CreditCenter = Loadable(React.lazy(() => import('../Pages/CreditCenter')))
const ScoreHistory = Loadable(React.lazy(() => import('../Pages/CreditCenter/Tabs/ScoreHistory')))
const CreditReports = Loadable(React.lazy(() => import('../Pages/CreditCenter/Tabs/CreditReports')))
const ScoreSimulator = Loadable(React.lazy(() => import('../Pages/CreditCenter/Tabs/ScoreSimulator')))
const Calculators = Loadable(React.lazy(() => import('../Pages/CreditCenter/Tabs/Calculators')))
const getContentStackData = getContentStackDataHook?.default

// eslint-disable-next-line no-unused-vars
export const routes = (configStoreData, benefits) => [
  benefits?.credit && {
    path: 'credit-center',
    element: <AuthGuardRoute />,
    children: [
      {
        path: '',
        loader: async () => Promise.all([
          getContentStackData(configStoreData, {
            contentId: 'protection_web_app_credit_center_v1',
            pageId: 'creditCenter',
          }),
          getContentStackData(configStoreData, {
            contentId: 'protection_web_app_credit_center_widget_v1',
            pageId: 'creditCenterWidget',
          }),
        ]),
        element: <CreditCenter />,
        children: [
          {
            path: 'credit-report',
            element: <CreditReports />,
          },
          {
            path: 'score-simulator',
            element: <ScoreSimulator />,
          },
          {
            path: 'score-history',
            element: <ScoreHistory />,
          },
          {
            path: 'calculators',
            element: <Calculators />,
          },
        ],
      },
    ],
  },
  benefits?.credit && {
    path: 'kba',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        loader: async () => getContentStackData(configStoreData, {
          contentId: 'protection_web_app_kba_v1',
          pageId: 'kba',
        }),
        element: <Kba />,
      },
    ],
  },
].filter((item) => item)

export const getRoutes = (configStoreData, benefits) => [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to="credit-center" />,
      },
      ...routes(configStoreData, benefits),
      {
        path: '*',
        element: <PublicRoute />,
        children: [
          {
            path: 'error',
            children: [
              {
                index: true,
                element: <FullPageError />,
              },
              {
                path: 'generic',
                element: <GenericErrorPage />,
              },
            ],
          },
          {
            path: '*',
            element: <Maintenance isPageNotFound />,
          },
        ],
      },
    ],
  },
]
