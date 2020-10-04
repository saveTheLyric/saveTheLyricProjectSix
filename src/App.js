import React, { Component } from 'react';
// import Firebase from './FirebaseComponent'
import './App.css';

import Header from './Header.js';
import Main from "./Main.js"
import Footer from "./Footer"

// import Spinner from 'Spinner';

class App extends Component {
  constructor() {
    super()
    this.state = {
      
    }
  }


  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}

export default App;
