/* eslint-disable import/no-unresolved */
import React from 'react'
import * as CommonComponents from 'COMMON_UI/common/Components'
import * as CommonPages from 'COMMON_UI/common/Pages'
import { routes as renderAuthRoutes } from 'PROTECTION_AUTH_UI/protection-auth-ui-routes'
import { routes as renderMainRoutes } from 'PROTECTION_UI/protection-ui-routes'
import { routes as renderIdentityProtectionRoutes } from 'PROTECTION_IDENTITY_PROTECTION_UI/protection-identity-protection-ui-routes'
import { routes as renderCreditCenterRoutes } from 'PROTECTION_CREDIT_CENTER_UI/protection-credit-center-ui-routes'

// eslint-disable-next-line func-names
export default function (configStoreData, benefits) {
  return [
    {
      path: '/',
      children: [
        ...renderMainRoutes(configStoreData),
        ...renderIdentityProtectionRoutes(configStoreData, benefits),
        ...renderCreditCenterRoutes(configStoreData, benefits),
        ...renderAuthRoutes(configStoreData),
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
}
