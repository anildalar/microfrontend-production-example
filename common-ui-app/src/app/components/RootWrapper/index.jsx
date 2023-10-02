/* eslint-disable no-nested-ternary */
import * as React from 'react'
import Loadable from '../Common/Loading/Loadable'

// eslint-disable-next-line import/no-unresolved
export const ContainerUIApp = Loadable(React.lazy(() => import('CONTAINER_UI/container-ui-app')))

const RootWrapper = () => (
  <ContainerUIApp>
    <center><h1>Common App</h1></center>
  </ContainerUIApp>
)

export default RootWrapper
