/**
 * @Author: Arthur Skinner
 * @Date:   2019-09-17T13:39:10+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-07T19:05:37+00:00
 */


import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import House from './components/House';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {

  render(){
    return(
      <div>

        <BrowserRouter>
          <Navigation />
        <Switch>


            <Route path="/:name" component={House}/>

        </Switch>
    </BrowserRouter></div>
    )
  }
}


export default App;
