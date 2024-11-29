import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import info from './Page/Info/info'

const Info = () => {
  return (
    <Router>
        <Route component={info} exact path="/" />
    </Router>
  )
}

ReactDOM.render(<Info />, document.getElementById('info'))
