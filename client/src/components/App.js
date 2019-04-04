import React from 'react';
import {Route, Switch} from 'react-router-dom'

const App = props => {
  return(
    
    <div>
      <Switch>
        <Route exact path='/' component={() => <h1>Head</h1>}></Route>

      </Switch>
    </div>
  )
}

export default App;