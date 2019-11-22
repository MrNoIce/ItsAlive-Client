import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import ItsAliveProject from './components/ItsAliveProject'
import './index.css'


ReactDOM.render(
  <Router>
      <ItsAliveProject />
  </Router>
  , document.getElementById('root'))

