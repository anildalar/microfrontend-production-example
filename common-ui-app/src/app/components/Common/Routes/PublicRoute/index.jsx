import React from 'react'

import AppLayout from '../AppLayout'
import { defaultProps, propTypes } from './types'

const PublicRoute = () => <AppLayout />

PublicRoute.propTypes = propTypes
PublicRoute.defaultProps = defaultProps

export default PublicRoute
