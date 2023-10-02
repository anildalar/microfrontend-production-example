import { t } from 'i18next'
import React from 'react'

import { Images } from '../Images'
import { BaseContainer, Image, Layout } from '../../../styles/styles'
import { defaultProps, propTypes } from './types'

const Loading = React.memo(({ layoutHeight, imageHeight }) => (
  <Layout height={layoutHeight}>
    <BaseContainer>
      <center>
        <Image height={imageHeight} src={`${window.COMMON_UI_URL}/${Images.LoadingGif}`} alt={t('common_items.loading_application')} />
      </center>
    </BaseContainer>
  </Layout>
))

Loading.propTypes = propTypes
Loading.defaultProps = defaultProps
Loading.displayName = 'Loading'

export default Loading
