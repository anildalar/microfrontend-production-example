/* eslint-disable import/no-unresolved */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { global } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

export const dropDownLabel = (label, actualCount, maxCount) => (
  <Grid container justifyContent="space-between">
    <Grid item>{label}</Grid>
    <Grid item>
      {actualCount}
      /
      {maxCount}
    </Grid>
  </Grid>
)

/* Asset Select Drop Form start */
const AssetSelectDropForm = React.memo(({
  assetType, setAssetType, options,
}) => {
  const { t } = useTranslation()

  const onClick = () => {
    setAssetType(assetType)
  }

  return (
    <>
      <Grid
        item
        flex={1}
        sx={{ maxWidth: '14rem' }}
      >
        <Field
          data-testid="input-asset-type"
          name="assetType"
          label="form_field_items.assetType_label"
          component={CommonComponents.Select}
          options={options}
        />
      </Grid>
      <Grid item>
        <Button
          data-testid="asset-add-button"
          aria-label={t('action_items.identityInfo_add_label')}
          variant="contained"
          onClick={onClick}
          size="medium"
          disabled={!assetType}
        >
          {t('action_items.identityInfo_add_label')}
        </Button>
      </Grid>
    </>
  )
})

const formName = 'AssetSelectActionForm'
const AssetSelectActionForm = reduxForm({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
})(AssetSelectDropForm)

const AssetSelectFormConnect = global?.utils?.connectReduxFormUtil(AssetSelectActionForm, formName, ['assetType'])

AssetSelectDropForm.propTypes = propTypes
AssetSelectDropForm.defaultProps = defaultProps
AssetSelectDropForm.displayName = 'AssetSelectDropForm'

export default AssetSelectFormConnect
