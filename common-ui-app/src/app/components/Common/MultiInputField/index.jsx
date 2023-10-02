/* eslint-disable no-debugger */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react'

const isStyleObject = (obj) => typeof obj === 'object' && obj !== null

const OTPInput = ({
  value = '',
  numInputs = 4,
  onChange,
  renderInput,
  shouldAutoFocus = false,
  inputType = 'text',
  renderSeparator,
  placeholder,
  containerStyle,
  inputStyle,
  inputWrapperStyle,
  ...rest
}) => {
  const [activeInput, setActiveInput] = React.useState(0)
  const inputRefs = React.useRef([])

  const getOTPValue = () => (value ? value.toString().split('') : [])

  const isInputNum = inputType === 'number' || inputType === 'tel'

  const KEYBOARD_KEY = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    backspace: 'Backspace',
    delete: 'Delete',
    home: 'Home',
    end: 'End',
  }
  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, numInputs)
  }, [numInputs])

  React.useEffect(() => {
    if (shouldAutoFocus) {
      inputRefs.current[0]?.focus()
    }
  }, [shouldAutoFocus])

  const getPlaceholderValue = () => {
    if (typeof placeholder === 'string') {
      if (placeholder.length === numInputs) {
        return placeholder
      }

      if (placeholder.length > 0) {
        console.error('Length of the placeholder should be equal to the number of inputs.')
      }
    }
    return undefined
  }

  const isInputValueValid = (value_) => {
    const isTypeValid = isInputNum ? !Number.isNaN(Number(value_)) : typeof value_ === 'string'
    return isTypeValid && value_.trim().length === 1
  }

  const focusInput = (index) => {
    const activeInputIndex = Math.max(Math.min(numInputs - 1, index), 0)

    if (inputRefs.current[activeInputIndex]) {
      inputRefs.current[activeInputIndex]?.focus()
      inputRefs.current[activeInputIndex]?.select()
      setActiveInput(activeInputIndex)
    }
  }

  const handleOTPChange = (otp) => {
    const otpValue = otp.join('')
    onChange(otpValue)
  }

  const changeCodeAtFocus = (val) => {
    const otp = getOTPValue()
    // eslint-disable-next-line prefer-destructuring
    otp[activeInput] = val[0]
    // otp[activeInput] = val
    handleOTPChange(otp)
  }

  const handleChange = (event) => {
    const val = event.target.value

    if (isInputValueValid(val)) {
      changeCodeAtFocus(val)
      focusInput(activeInput + 1)
    }
  }

  const handleInputChange = (event) => {
    const { nativeEvent } = event
    if (!isInputValueValid(event.target.value)) {
      // @ts-expect-error - This was added previosly to handle and edge case
      // for dealing with keyCode "229 Unidentified" on Android. Check if this is
      // still needed.
      if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
        event.preventDefault()
        changeCodeAtFocus('')
        focusInput(activeInput - 1)
      }
      // Clear the input if it's not valid value because firefox allows
      // pasting non-numeric characters in a number type input
      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    }
  }

  const handleFocus = (event) => (index) => {
    setActiveInput(index)
    event.target.select()
  }

  const handleBlur = () => {
    setActiveInput(activeInput - 1)
  }

  const handleKeyDown = (event) => {
    const otp = getOTPValue()
    if ([event.code, event.key].includes(KEYBOARD_KEY.backspace)) {
      event.preventDefault()
      changeCodeAtFocus('')
      focusInput(activeInput - 1)
    } else if (event.code === KEYBOARD_KEY.delete) {
      event.preventDefault()
      changeCodeAtFocus('')
    } else if (event.code === KEYBOARD_KEY.left) {
      event.preventDefault()
      focusInput(activeInput - 1)
    } else if (event.code === KEYBOARD_KEY.right) {
      event.preventDefault()
      focusInput(activeInput + 1)
    } else if (event.code === KEYBOARD_KEY.home) {
      event.preventDefault()
      focusInput(0)
    } else if (event.code === KEYBOARD_KEY.end) {
      event.preventDefault()
      focusInput(numInputs - 1)
    } else if (
      event.code === 'Spacebar'
      || event.code === 'Space'
      || event.code === 'ArrowUp'
      || event.code === 'ArrowDown'
    ) {
      event.preventDefault()
    } else if (event.key === otp[activeInput]) {
      // React does not trigger onChange when the same value is entered
      // again. So we need to focus the next input manually in this case.
      event.preventDefault()
      focusInput(activeInput + 1)
    } else if (isInputNum && !isInputValueValid(event.key)) {
      event.preventDefault()
    }
  }

  const handlePaste = (event) => {
    event.preventDefault()

    const otp = getOTPValue()
    let nextActiveInput = activeInput

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = event.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('')

    // Prevent pasting if the clipboard data contains non-numeric values for number inputs
    if (isInputNum && pastedData.some((value_) => Number.isNaN(Number(value_)))) {
      return
    }

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift() ?? ''
        nextActiveInput++
      }
    }

    focusInput(nextActiveInput)
    handleOTPChange(otp)
  }

  return (
    <div
      style={({ display: 'flex', alignItems: 'center', ...isStyleObject(containerStyle) && containerStyle })}
      className={typeof containerStyle === 'string' ? containerStyle : undefined}
    >
      {Array.from({ length: numInputs }, (_, index) => index).map((index) => (
        <React.Fragment key={index}>
          {renderInput(
            {
              value: getOTPValue()[index] ?? '',
              placeholder: getPlaceholderValue()?.[index] ?? undefined,
              inputRef: (element) => {
                inputRefs.current[index] = element
              },
              onChange: handleChange,
              onFocus: (event) => handleFocus(event)(index),
              onBlur: handleBlur,
              onKeyDown: handleKeyDown,
              onPaste: handlePaste,
              autoComplete: 'off',
              maxLength: 1,
              'aria-label': `Please enter OTP character ${index + 1}`,
              inputProps: {
                id: `${rest?.name}-${index}`,
                sx: {
                  ...(isStyleObject(inputStyle) && inputStyle),
                },
              },
              style: { ...isStyleObject(inputWrapperStyle) && inputWrapperStyle },
              type: inputType,
              inputMode: isInputNum ? 'numeric' : 'text',
              onInput: handleInputChange,
            },
            index,
            { ...rest },
          )}
          {index < numInputs - 1 && (typeof renderSeparator === 'function' ? renderSeparator(index) : renderSeparator)}
        </React.Fragment>
      ))}
    </div>
  )
}

export default OTPInput
