/* eslint-disable import/no-unresolved */
import { Typography, Chip } from '@mui/material'
import React from 'react'
import { hooks } from 'tenerity-ui-toolkit'

/* eslint-disable react/prop-types */
export const DateTimeDisplay = ({ value }) => (
  <span>{value.toString().length === 1 ? `0${value}` : value}</span>
)

export const TimmerChip = ({
  targetDate, valueInSeconds, restart, stop, onStart, onComplete,
}) => {
  const { minutes, seconds } = hooks?.useCountDownTimerHook({
    targetDate, valueInSeconds, restart, stop, onStart, onComplete,
  })
  const render = () => (
    <Chip
      variant="filled"
      sx={{ minWidth: '0%' }}
      color="default"
      label={(
        <Typography>
          <DateTimeDisplay value={minutes} />
          :
          <DateTimeDisplay value={seconds} />
        </Typography>
      )}
    />
  )

  return render()
}
