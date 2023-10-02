/* eslint-disable react/prop-types */
import React from 'react'
import { Grid } from '@mui/material'

import DynamicSVG from '../DynamicSVG'

const Cards = ({ cardsArray }) => (
  <Grid container direction="row-reverse" item xs spacing={1}>
    {cardsArray?.map((card) => (
      <Grid item key={card}>
        <DynamicSVG path={card} />
      </Grid>
    ))}
  </Grid>
)

export default Cards
