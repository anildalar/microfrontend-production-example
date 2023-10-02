/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SuccesComponent } from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import KbaAction from './KbaAction'
import * as postKbaReducer from '../../../redux/reducers/kba/postKba'
import * as kbaReducer from '../../../redux/reducers/kba'
import { defaultProps, propTypes } from './types'

const Kba = () => {
  const { setUnMountAction } = hooks?.useUnmount()
  const postKba = useSelector((state) => state?.postKba)
  const { data } = postKba

  useEffect(() => {
    setUnMountAction([
      kbaReducer.setReset.type,
      postKbaReducer.setReset.type,
    ])
  }, [setUnMountAction])

  const renderContent = () => {
    switch (data?.status.toLowerCase()) {
      case 'success':
        return (
          <SuccesComponent
            isAction
            to="/dashboard"
            dataTestid="kba_success"
            pageId="kba"
          />
        )
      default:
        return (
          <KbaAction />
        )
    }
  }
  return (
    <>
      {renderContent()}
    </>
  )
}

Kba.propTypes = propTypes
Kba.defaultProps = defaultProps

export default Kba
