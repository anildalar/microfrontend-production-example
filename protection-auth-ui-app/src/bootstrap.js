import React from 'react'
import ReactDOM from 'react-dom'
import Main from './app/components/Main'

require('./notranslate')

ReactDOM.render(<Main />, document.getElementById('auth-root'))
