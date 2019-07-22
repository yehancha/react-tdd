import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { counter: 0 }

  render = () => {
    const { counter } = this.state;

    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>The counter is currently {counter}</h1>
        <button
          data-test='increment-button'
          onClick={() => this.setState({ counter: counter + 1 })}>
            Increment counter
        </button>
      </div>
    );
  }
}

export default App;
