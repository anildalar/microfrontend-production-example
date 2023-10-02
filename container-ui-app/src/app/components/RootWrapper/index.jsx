import React from 'react'
import { Provider } from 'react-redux'

import store from '../../redux/store'
import Root from '../Root'
import { defaultProps, propTypes } from './types'

const RootWrapper = React.memo(({ children, reducers, sagas }) => {
  const combinedStore = typeof store === 'function' ? store(reducers, sagas) : store
  return (
    <Provider store={combinedStore}>
      <Root>{children}</Root>
    </Provider>
  )
})

RootWrapper.propTypes = propTypes
RootWrapper.defaultProps = defaultProps
RootWrapper.displayName = 'RootWrapper'
export default RootWrapper
