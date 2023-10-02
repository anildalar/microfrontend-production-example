/* eslint-disable react/prop-types */
import {
  Button, useTheme,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Popper,
  MenuList,
} from '@mui/material'
import React from 'react'

import { PaperStyled, MenuItemStyled } from './styled'
import { defaultProps, propTypes } from './types'
import { Images } from '../Images'
import DynamicSVG from '../DynamicSVG'

export const GroupingPopover = ({
  TransitionProps, placement, options, handleClose, selectedIndex, handleMenuItemClick,
}) => (
  <Grow
    {...TransitionProps}
    style={{
      transformOrigin:
        placement === 'bottom' ? 'center top' : 'center bottom',
    }}
  >
    <PaperStyled>
      <ClickAwayListener onClickAway={handleClose}>
        <MenuList id="split-button-menu" autoFocusItem>
          {options.map((option, index) => (
            <MenuItemStyled
              data-testid={option?.['data-testid']}
              key={option?.['data-testid']}
              disabled={option?.disabled}
              selected={index === selectedIndex}
              onClick={(event) => {
                if (!option?.disabled) {
                  handleMenuItemClick(event, index)
                  option.onClick(option)
                }
              }}
            >
              {option?.label}
            </MenuItemStyled>
          ))}
        </MenuList>
      </ClickAwayListener>
    </PaperStyled>
  </Grow>
)

const ButtonWithPopover = (props) => {
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  /* istanbul ignore next */
  const handleClose = (event) => {
    if (anchorRef?.current?.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const render = () => (
    <>
      <ButtonGroup variant="outlined" ref={anchorRef}>
        <Button
          data-testid={props?.['data-testid']}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {props?.label}
          &nbsp;&nbsp;&nbsp;
          <DynamicSVG
            path={Images.ArrowDownIcon}
            data-testid="button-popover-arrow-down-icon"
            style={{
              ...theme?.customStyle?.buttonWithPopover?.icons?.colorStroke,
              ...theme?.customStyle?.buttonWithPopover?.icons?.arrowStyle,
            }}
          />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef?.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <GroupingPopover
            options={props?.options}
            handleClose={handleClose}
            selectedIndex={selectedIndex}
            handleMenuItemClick={handleMenuItemClick}
            TransitionProps={TransitionProps}
            placement={placement}
          />
        )}
      </Popper>
    </>
  )

  return render()
}

ButtonWithPopover.propTypes = propTypes
ButtonWithPopover.defaultProps = defaultProps

export default ButtonWithPopover
