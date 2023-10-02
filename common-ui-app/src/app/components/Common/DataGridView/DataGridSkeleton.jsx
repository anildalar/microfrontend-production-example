import * as React from 'react'
import {
  useGridApiContext,
  gridColumnsTotalWidthSelector,
  gridColumnPositionsSelector,
} from '@mui/x-data-grid'
import {
  // eslint-disable-next-line no-unused-vars
  Box, Skeleton, LinearProgress, styled,
} from '@mui/material'
import { SkeletonCell } from '../../../styles/styles'

// Pseudo random number. See https://stackoverflow.com/a/47593316
/* istanbul ignore next */
const mulberry32 = (a) => () => {
  /* eslint-disable */
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    /* eslint-enable */
}

/* istanbul ignore next */
const randomBetween = (seed, min, max) => {
  const random = mulberry32(seed)
  return () => min + (max - min) * random()
}

const SkeletonLoadingOverlay = () => {
  const apiRef = useGridApiContext()

  const dimensions = apiRef.current?.getRootDimensions()
  /* istanbul ignore next */
  const viewportHeight = dimensions?.viewportInnerSize.height ?? 0

  // eslint-disable-next-line max-len
  // @ts-expect-error Function signature expects to be called with parameters, but the implementation suggests otherwise
  const rowHeight = apiRef.current.unstable_getRowHeight()
  const skeletonRowsCount = Math.ceil(viewportHeight / rowHeight)

  const totalWidth = gridColumnsTotalWidthSelector(apiRef)
  const positions = gridColumnPositionsSelector(apiRef)
  const inViewportCount = React.useMemo(
    () => positions.filter((value) => value <= totalWidth).length,
    [totalWidth, positions],
  )
  const columns = apiRef.current.getVisibleColumns().slice(0, inViewportCount)

  const children = React.useMemo(() => {
    // reseed random number generator to create stable lines betwen renders
    const random = randomBetween(12345, 25, 75)
    const array = []

    /* istanbul ignore next */
    for (let i = 0; i < skeletonRowsCount; i += 1) {
      // eslint-disable-next-line no-restricted-syntax
      for (const column of columns) {
        const width = Math.round(random())
        array.push(
          <SkeletonCell
            key={`column-${i}-${column.field}`}
            sx={{ justifyContent: column.align }}
          >
            <Skeleton sx={{ mx: 1 }} width={`${width}%`} />
          </SkeletonCell>,
        )
      }
      array.push(<SkeletonCell key={`fill-${i}`} />)
    }
    return array
  }, [skeletonRowsCount, columns])

  const rowsCount = apiRef.current.getRowsCount()

  return rowsCount === 0 && (
    <div
      data-testid="skeleton-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `${columns
          .map(({ computedWidth }) => `${computedWidth}px`)
          .join(' ')} 1fr`,
        gridAutoRows: rowHeight,
      }}
    >
      {children}
    </div>
  )
}

export default SkeletonLoadingOverlay
