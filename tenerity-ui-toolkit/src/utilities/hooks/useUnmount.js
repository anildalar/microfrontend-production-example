import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { reset } from 'redux-form'

const useUnmount = () => {
  const dispatch = useDispatch()
  const [activeForm, setActiveForm] = useState(null)
  const [unMountAction, setUnMountAction] = useState(null)

  useEffect(() => () => {
    if (activeForm) {
      dispatch(reset(activeForm))
      setActiveForm(null)
    }
  }, [dispatch, activeForm])

  // Reset all passed reducers or have callback function on unmount
  /* istanbul ignore next */
  useEffect(() => () => {
    if (typeof (unMountAction) === 'object' || typeof (unMountAction) === 'string') {
      if (Array.isArray(unMountAction)) {
        unMountAction.forEach((unMountReducer) => {
          dispatch({ type: unMountReducer })
        })
        setUnMountAction(null)
      } else if (typeof (unMountAction) === 'string' && unMountAction) {
        dispatch({ type: unMountAction })
        setUnMountAction(null)
      }
    } else if (typeof (unMountAction) === 'function') {
      unMountAction()
      setUnMountAction(null)
    }
  }, [dispatch, unMountAction])

  return { setActiveForm, setUnMountAction }
}
export default useUnmount
