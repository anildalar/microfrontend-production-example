/* eslint-disable import/no-unresolved */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { getContentStackData as getContentStackDataHook } from 'tenerity-ui-toolkit'

import * as CommonComponents from 'COMMON_UI/common/Components'
import * as CommonPages from 'COMMON_UI/common/Pages'

const getContentStackData = getContentStackDataHook?.default

const IdentityInfoCenter = CommonComponents?.Loadable(React.lazy(() => import('../Pages/IdentityInfoCenter')))
const PersonalData = CommonComponents?.Loadable(React.lazy(() => import('../Pages/IdentityInfoCenter/PersonalData')))
const FinanceData = CommonComponents?.Loadable(React.lazy(() => import('../Pages/IdentityInfoCenter/FinanceData')))
const IdDocuments = CommonComponents?.Loadable(React.lazy(() => import('../Pages/IdentityInfoCenter/IdDocuments')))

export const routes = (configStoreData, benefits) => [
  benefits?.identity && {
    path: 'identity-center',
    element: <CommonComponents.AuthGuardRoute />,
    children: [
      {
        path: '',
        loader: async () => getContentStackData(configStoreData, {
          contentId: 'protection_web_app_identity_info_v1',
          pageId: 'identityInfo',
        }),
        element: <IdentityInfoCenter />,
        children: [
          {
            path: 'personal',
            element: <PersonalData />,
          },
          {
            path: 'financial',
            element: <FinanceData />,
          },
          {
            path: 'documents',
            element: <IdDocuments />,
          },
        ],
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
        element: <Navigate to="identity-center" />,
      },
      ...routes(configStoreData, benefits),
      {
        path: '*',
        element: <CommonComponents.PublicRoute />,
        children: [
          {
            path: 'error',
            children: [
              {
                index: true,
                element: <CommonPages.FullPageError />,
              },
              {
                path: 'generic',
                element: <CommonPages.GenericErrorPage />,
              },
            ],
          },
          {
            path: '*',
            element: <CommonPages.Maintenance isPageNotFound />,
          },
        ],
      },
    ],
  },
]
