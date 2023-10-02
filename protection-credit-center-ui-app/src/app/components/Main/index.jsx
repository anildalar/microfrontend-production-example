/* eslint-disable import/no-unresolved */
import React from 'react'
import { Loadable } from 'COMMON_UI/common/Components'

import * as main from '../../redux/reducers'
import mainSagas from '../../redux/saga'

import AppRoutes from '../AppRoutes'

export const ContainerUIApp = Loadable(React.lazy(() => import('CONTAINER_UI/container-ui-app')))

const Main = () => {
  const render = () => (
    <ContainerUIApp reducers={{ ...main?.allReducers }} sagas={[mainSagas]}>
      <AppRoutes />
    </ContainerUIApp>
  )

  return render()
}

export default Main
