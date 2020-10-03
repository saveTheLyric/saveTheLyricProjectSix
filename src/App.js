import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import Body from "./Body.js"
import Firebase from './FirebaseComponent'

class App extends Component {
  constructor() {
    super()
    this.state = {
      
    }
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Body/>
        <div>
          <Firebase />
        </div>
      </div>
    );
  }
}

export default App;
