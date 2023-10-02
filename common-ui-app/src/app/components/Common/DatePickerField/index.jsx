import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useTranslation } from 'react-i18next'
import InputField from '../InputField'
import { defaultProps, propTypes } from './types'

const DatePickerField = ({
  label,
  input,
  dateFormat,
  ...rest
}) => {
  const { t } = useTranslation()
  const [textFieldFocused, setTextFieldFocus] = React.useState(false)
  const custom = { ...rest }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={t(label)}
        // {...input}
        {...custom}
        slotProps={{
          textField: {
            ...custom,
            textFieldFocused,
            onBlur: () => setTextFieldFocus(true),
          },
        }}
        slots={{
          textField: InputField,
        }}
        onChange={(value) => {
          if (custom?.disabled) { value.preventDefault() } else {
            input?.onChange(value.format(dateFormat))
          }
        }}
      />
    </LocalizationProvider>
  )
}
DatePickerField.propTypes = propTypes
DatePickerField.defaultProps = defaultProps
DatePickerField.displayName = 'DatePickerField'
export default DatePickerField
