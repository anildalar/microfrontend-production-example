import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className'

ClassNameGenerator.configure((componentName) => (componentName === 'MuiTypography'
  || componentName === 'MuiFormLabel' || componentName === 'MuiFormControl' || componentName === 'MuiFormHelperText'
 || componentName === 'MuiButton' || componentName === 'MuiInput' ? componentName.replace('', 'notranslate ') : componentName))
