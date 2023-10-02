/* eslint-disable import/no-unresolved */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { getContentStackData as getContentStackDataHook } from 'tenerity-ui-toolkit'

import * as CommonComponents from 'COMMON_UI/common/Components'
import * as CommonPages from 'COMMON_UI/common/Pages'

const getContentStackData = getContentStackDataHook?.default

const Login = CommonComponents?.Loadable(React.lazy(() => import('../Pages/Login')))
const Registration = CommonComponents?.Loadable(React.lazy(() => import('../Pages/Registration')))
const SelfRegistrationAction = CommonComponents?.Loadable(React.lazy(() => import('../Pages/Registration/SelfRegistrationAction')))
const ResetPassword = CommonComponents?.Loadable(React.lazy(() => import('../Pages/ResetPassword')))
const ForgotPassword = CommonComponents?.Loadable(React.lazy(() => import('../Pages/ForgotPassword')))
const OneTimeRegistrationAction = CommonComponents?.Loadable(React.lazy(() => import('../Pages/Registration/OneTimeRegistrationAction')))
const GroupCodeRegistrationAction = CommonComponents?.Loadable(React.lazy(() => import('../Pages/Registration/GroupCodeRegistrationAction')))
const OTP = CommonComponents?.Loadable(React.lazy(() => import('../Pages/OTP')))

export const routes = (configStoreData) => [
  {
    path: 'secure',
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: '',
        element: <CommonComponents.UnAuthGuardRoute />,
        children: [
          {
            path: 'login',
            loader: async () => getContentStackData(configStoreData, {
              contentId: 'protection_web_app_login_v1',
              pageId: 'login',
            }),
            element: <Login />,
            children: [],
          },
          {
            path: 'sign-up',
            loader: async () => getContentStackData(configStoreData, {
              contentId: 'protection_web_app_registration_v1',
              pageId: 'registration',
            }),
            element: <Registration />,
            children: [
              {
                path: 'self',
                element: <SelfRegistrationAction />,
              },
              {
                path: 'onetime-code',
                element: <OneTimeRegistrationAction />,
              },
              {
                path: 'group-code',
                element: <GroupCodeRegistrationAction />,
              },
              {
                path: '',
                element: <CommonPages.Maintenance isPageNotFound />,
              },
            ],
          },
          {
            path: 'reset-password/:resetPasswordId',
            loader: async () => getContentStackData(configStoreData, {
              contentId: 'protection_web_app_reset_password_v1',
              pageId: 'resetPassword',
            }),
            element: <ResetPassword />,
            children: [],
          },
          {
            path: 'forgot-password',
            loader: async () => getContentStackData(configStoreData, {
              contentId: 'protection_web_app_forgot_password_v1',
              pageId: 'forgotPassword',
            }),
            element: <ForgotPassword />,
            children: [],
          },
          {
            path: 'tfa',
            element: <OTP />,
          },
        ],
      },
    ],
  },
]

export const getRoutes = (configStoreData) => [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to="secure/login" />,
      },
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
