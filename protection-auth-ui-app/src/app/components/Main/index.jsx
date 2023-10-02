/* eslint-disable import/no-unresolved */
import React from 'react'
import * as CommonComponents from 'COMMON_UI/common/Components'

import * as auth from '../../redux/reducers'
import authSagas from '../../redux/saga'
import AppRoutes from '../AppRoutes'

export const ContainerUIApp = CommonComponents?.Loadable(React.lazy(() => import('CONTAINER_UI/container-ui-app')))

const Main = () => {
  const render = () => (
    <ContainerUIApp reducers={{ ...auth?.allReducers }} sagas={[authSagas]}>
      <AppRoutes />
    </ContainerUIApp>
  )

  return render()
}

export default Main
