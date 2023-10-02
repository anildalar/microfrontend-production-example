import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { hooks } from 'tenerity-ui-toolkit'

import { getRoutes } from './routes'
import { defaultProps, propTypes } from './types'

const AppRoutes = React.memo(() => {
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const routes = getRoutes(configStoreData)
  const browserRouter = createBrowserRouter(routes)

  return (
    <RouterProvider router={browserRouter} />
  )
})

AppRoutes.propTypes = propTypes
AppRoutes.defaultProps = defaultProps
AppRoutes.displayName = 'AppRoutes'

export default AppRoutes
