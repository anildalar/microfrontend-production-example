import { styled } from '@mui/system'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'

export const PaperStyled = styled(Paper)(({ theme }) => ({
  ...theme?.customStyle?.buttonWithPopover?.paper,
}))

export const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  ...theme?.customStyle?.buttonWithPopover?.menuItem,
}))
