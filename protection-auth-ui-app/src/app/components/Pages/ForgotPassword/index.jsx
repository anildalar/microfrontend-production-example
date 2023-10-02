import React from 'react'
import { styles } from 'tenerity-ui-toolkit'

import ForgotPasswordAction from './ForgotPasswordAction'
import { defaultProps, propTypes } from './types'

const { PageLayout, SmallPageContainer } = styles

const ForgotPassword = React.memo(() => (
  <PageLayout>
    <SmallPageContainer>
      <ForgotPasswordAction />
    </SmallPageContainer>
  </PageLayout>
))

ForgotPassword.propTypes = propTypes
ForgotPassword.defaultProps = defaultProps
ForgotPassword.displayName = 'ForgotPassword'

export default ForgotPassword
