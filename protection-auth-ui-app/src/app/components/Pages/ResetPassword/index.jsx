/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { hooks, styles } from 'tenerity-ui-toolkit'
import * as CommonComponents from 'COMMON_UI/common/Components'

import ResetPasswordAction from './ResetPasswordAction'
import * as resetPasswordReducer from '../../../redux/reducers/resetPassword'
import * as resetPasswordApprovalReducer from '../../../redux/reducers/resetPasswordApproval'
import { defaultProps, propTypes } from './types'

const { PageLayout, SmallPageContainer } = styles

const ResetPassword = React.memo(() => {
  const { setUnMountAction } = hooks?.useUnmount()
  const resetPassword = useSelector((state) => state?.resetPassword)
  const { data } = resetPassword

  useEffect(() => {
    setUnMountAction([
      resetPasswordReducer.setReset.type,
      resetPasswordApprovalReducer.setReset.type,
    ])
  }, [setUnMountAction])

  const renderContent = () => {
    switch (data?.status) {
      case true:
        return (
          <CommonComponents.SuccesComponent
            isAction
            to="/secure/login"
            dataTestid="resetPassword_success"
            pageId="resetPassword"
          />
        )
      default:
        return (
          <ResetPasswordAction />
        )
    }
  }

  return (
    <PageLayout>
      <SmallPageContainer>
        {renderContent()}
      </SmallPageContainer>
    </PageLayout>

  )
})

ResetPassword.propTypes = propTypes
ResetPassword.defaultProps = defaultProps
ResetPassword.displayName = 'ResetPassword'

export default ResetPassword
