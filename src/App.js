/**
 * @Author: Arthur Skinner
 * @Date:   2019-09-17T13:39:10+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T12:19:48+00:00
 */


import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import House from './components/House';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';



class App extends React.Component {

  render(){
    return(
    <>
      <BrowserRouter>
        <Navigation/>
          <Switch>
            {/* sends the name of the clicked link to the house component */}
            <Route path="/:name" component={House}/>
            {/* setting the Home component to be the default homepage */}
            <Redirect exact="exact" from="/" to="home"/>
          </Switch>
          <br />
          {/* Footer */}
          <Footer />
      </BrowserRouter>
    </>
    )
  }
}


export default App;
