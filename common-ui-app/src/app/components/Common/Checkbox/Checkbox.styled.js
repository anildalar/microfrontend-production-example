import { styled } from '@mui/system'
import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export const FormControlLabelStyled = styled(FormControlLabel, {
  shouldForwardProp: (props) => props !== 'inputProps',
})(({ theme, inputProps }) => ({
  [`&.${formControlLabelClasses.root}`]: {
    margin: 0,
    pointerEvents: inputProps?.tabIndex < 0 ? 'none' : 'auto',
    cursor: inputProps?.tabIndex < 0 ? 'pointer' : 'default',
  },

  [`& .${formControlLabelClasses.label}`]: {
    ...theme?.typography?.body2,
    ...theme?.customStyle?.formControlLabel,
  },
}))

export const CheckboxStyled = styled(Checkbox)(({ theme, size }) => ({
  fontSize: size ? `${size}px` : theme?.customStyle?.checkBoxStyle?.fontSize,
}))
