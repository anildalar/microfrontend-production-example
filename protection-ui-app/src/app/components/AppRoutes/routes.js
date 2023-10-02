/* eslint-disable import/no-unresolved */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { getContentStackData as getContentStackDataHook } from 'tenerity-ui-toolkit'

import * as CommonComponents from 'COMMON_UI/common/Components'
import * as CommonPages from 'COMMON_UI/common/Pages'

const getContentStackData = getContentStackDataHook?.default

const Dashboard = CommonComponents?.Loadable(React.lazy(() => import('../Pages/Dashboard')))
const AlertCenter = CommonComponents?.Loadable(React.lazy(() => import('../Pages/AlertCenter')))
const AlertLists = CommonComponents?.Loadable(React.lazy(() => import('../Pages/AlertCenter/AlertLists')))

export const routes = (configStoreData) => [
  {
    index: true,
    element: <Navigate to="dashboard" />,
  },
  {
    path: '',
    element: <CommonComponents.AuthGuardRoute />,
    children: [
      {
        path: 'dashboard',
        loader: async () => Promise.all([
          getContentStackData(configStoreData, {
            contentId: 'protection_web_app_dashboard_v1',
            pageId: 'dashboard',
          }),
          getContentStackData(configStoreData, {
            contentId: 'protection_web_app_credit_center_widget_v1',
            pageId: 'creditCenterWidget',
          }),
        ]),
        element: <Dashboard />,
        children: [],
      },
      {
        path: 'alert-center',
        loader: async () => getContentStackData(configStoreData, {
          contentId: 'protection_web_app_alert_center_v1',
          pageId: 'alertCenter',
        }),
        element: <AlertCenter />,
        children: [
          {
            path: 'active-alerts',
            element: <AlertLists emptyText="no_active_alerts_found" status="NEW" />,
          },
          {
            path: 'resolved-alerts',
            element: <AlertLists emptyText="no_resolved_alerts_found" status="RESOLVED" />,
          },
        ],
      },
      {
        path: 'education-center',
        loader: async () => [],
        element: <CommonPages.Maintenance isInDev />,
        children: [],
      },
      {
        path: 'plan-details',
        loader: async () => [],
        element: <CommonPages.Maintenance isInDev />,
        children: [],
      },
      {
        path: 'contact-us',
        loader: async () => [],
        element: <CommonPages.Maintenance isInDev />,
        children: [],
      },
      {
        path: 'profile',
        loader: async () => [],
        element: <CommonPages.Maintenance isInDev />,
        children: [],
      },
      {
        path: 'logout',
        element: <CommonComponents.Logout />,
        children: [],
      },
    ],
  },
]

export const getRoutes = (configStoreData) => [
  {
    path: '/',
    children: [
      ...routes(configStoreData),
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
