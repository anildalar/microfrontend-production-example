/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import {
  Button, Divider, Grid, Typography, useTheme,
} from '@mui/material'
import { MCQ } from 'COMMON_UI/common/Components'

import { LargeSectionFormContainer } from '../../../../styles/styles'
import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = {}
  const kbaData = props?.kbaData
  if (kbaData) {
    kbaData.forEach((field) => {
      if (!values[`questionNumber-${field?.questionId}`]) {
        errors[`questionNumber-${field?.questionId}`] = 'required'
      }
    })
  }
  return errors
}

const KbaActionReduxForm = React.memo((props) => {
  const {
    pristine, invalid, handleSubmit, submitting, isSubmitting, kbaData,
  } = props
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit} data-testid="kba-action-form">
      <LargeSectionFormContainer>
        {
          kbaData?.map((questionData, index) => (
            <React.Fragment key={questionData?.questionId}>
              {index === 0 ? null : (
                <Divider sx={{ ...theme?.customStyle?.kba?.dividerStyle }} />
              )}
              <Field
                data-testid={`input-kba-${questionData?.questionId}`}
                name={`questionNumber-${questionData?.questionId}`}
                options={questionData?.answerOptionList}
                sx={{ ...theme?.customStyle?.kba?.radioGroupContainer }}
                question={(
                  <Typography
                    align="left"
                    color="text.primary"
                    data-testid={`input-kba-label${questionData?.questionId}`}
                    variant="h5"
                  >
                    {`${questionData?.questionId}) ${questionData?.question}`}
                  </Typography>
                )}
                component={MCQ}
                componentProps={{ typography: { variant: 'body2' } }}
              />
            </React.Fragment>
          ))
        }
      </LargeSectionFormContainer>
      <Grid
        container
        sx={{ ...theme?.customStyle?.kba?.gridContainer }}
      >
        <Grid item>
          <Button
            align="center"
            data-testid="kba-submit-action"
            aria-label={t('action_items.submit_label')}
            variant="contained"
            type="submit"
            disabled={invalid || submitting || isSubmitting || pristine}
          >
            {t('action_items.submit_label')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
})

const KbaActionForm = reduxForm({
  form: 'KbaActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(KbaActionReduxForm)

KbaActionReduxForm.propTypes = propTypes
KbaActionReduxForm.defaultProps = defaultProps
KbaActionReduxForm.displayName = 'KbaActionReduxForm'

export default KbaActionForm
