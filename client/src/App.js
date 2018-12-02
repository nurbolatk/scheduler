import React, { Component } from 'react';
import Navbar from './components/layout/Navbar'
import Calendar from './components/Calendar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Calendar />
      </div>
    );
  }
}

export default App;
