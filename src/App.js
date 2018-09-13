import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'; 
import ReviewContainer from './ReviewContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ReviewContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
