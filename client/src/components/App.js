import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
const App = props => {
  return(
    
    <div>
      <Navbar/ >
      <Switch>
        <Route exact path='/' component={() => <h1>Head</h1>}></Route>

      </Switch>
    </div>
  )
}

export default App;