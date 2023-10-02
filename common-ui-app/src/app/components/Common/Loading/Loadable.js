import React, { Suspense } from 'react'

// project imports
import Loader from '../Loader'

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => {
  const InnerProps = (props) => (
    <Suspense fallback={<Loader size="5rem" thickness={2} />}>
      <Component {...props} />
    </Suspense>
  )
  return InnerProps
}

export default Loadable
