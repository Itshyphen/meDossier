import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Home from './home'
import DocDashboard from './doctor_dashboard'
import PatDashboard from './patients_dashboard'

function WebPage() {
  return (
      <Router>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/doctor_dashboard" component = {DocDashboard} />
          <Route exact path = "/patients_dashboard" component = {PatDashboard} />
      </Router>
   
  );
}

export default WebPage;

