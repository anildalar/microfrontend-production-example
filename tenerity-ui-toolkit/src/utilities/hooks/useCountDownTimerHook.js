/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCallback, useEffect, useRef, useState,
} from 'react'

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (60 * 60 * 24))
  const hours = Math.floor((countDown % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((countDown % (60 * 60)) / (60))
  const seconds = Math.floor((countDown % (60)) / 1)

  const timerValue = days + hours + minutes + seconds
  const isExpired = ((days + hours + minutes + seconds) <= 0)

  return { days, hours, minutes, seconds, timerValue, isExpired }
}

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

const useCountDownTimerHook = ({
  targetDate, valueInSeconds, restart, stop, onStart, onComplete,
}) => {
  const previousProps = usePrevious({
    targetDate, restart, stop, valueInSeconds,
  })

  const countDownDate = new Date(targetDate).getTime()
  const [countDown, setCountDown] = useState(
    valueInSeconds || Math.floor((countDownDate - new Date().getTime()) / 1000),
  )

  const tick = useCallback(() => {
    setCountDown((prev) => prev - 1) /* countDownDate - new Date().getTime() */
  }, [])

  const startTimer = useCallback(() => {
    const interval = setInterval(tick, 1000)
    return interval
  }, [])

  useEffect(() => {
    if (typeof onStart === 'function') {
      onStart()
    }
  }, [])

  useEffect(() => {
    let interval = 0
    if ((!previousProps?.restart && restart)) {
      clearInterval(interval)
      setCountDown(valueInSeconds || Math.floor((countDownDate - new Date().getTime()) / 1000))
      interval = startTimer()
      if (typeof onStart === 'function') {
        onStart()
      }
    }
    return () => clearInterval(interval)
  }, [previousProps, restart, valueInSeconds, countDownDate])

  useEffect(() => {
    const interval = startTimer()
    if (countDown <= 0 || stop) {
      clearInterval(interval)
      if (!stop && typeof onComplete === 'function') {
        onComplete()
      }
    }
    return () => clearInterval(interval)
  }, [countDown, stop])
  return getReturnValues(countDown)
}

export default useCountDownTimerHook
