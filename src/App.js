import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    counter: 0,
    hasError: false,
  }

  updateCounter = addition => {
    let { counter } = this.state;
    let hasError = false;

    counter += addition;
    if (counter < 0) {
      counter = 0;
      hasError = true;
    }
    
    this.setState({ counter, hasError });
  }

  render = () => {
    const { counter, hasError } = this.state;

    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>The counter is currently {counter}</h1>
        {hasError && <h2 data-test='error-message' style={{ color: 'red' }}>The counter cannot go below 0.</h2>}
        <button
          data-test='increment-button'
          onClick={() => this.updateCounter(1)}>
            Increment counter
        </button>
        <button
          data-test='decrement-button'
          onClick={() => this.updateCounter(-1)}>
            Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
