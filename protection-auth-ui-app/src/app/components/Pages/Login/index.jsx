import React from 'react'
import { styles } from 'tenerity-ui-toolkit'

import LoginAction from './LoginAction'
import { defaultProps, propTypes } from './types'

const { PageLayout, SmallPageContainer } = styles

const Login = React.memo(() => (
  <PageLayout>
    <SmallPageContainer>
      <LoginAction />
    </SmallPageContainer>
  </PageLayout>
))

Login.propTypes = propTypes
Login.defaultProps = defaultProps
Login.displayName = 'Login'

export default Login
