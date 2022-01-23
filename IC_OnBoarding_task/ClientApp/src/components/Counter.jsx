import React, { Component } from 'react';


export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, isActive: false };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    console.log("Current Count in console: "+this.state.currentCount);
  }

  componentDidMount() {
    const { isActive } = this.state;
    
    document.addEventListener('click', (evt) => {
        if (evt.target.closest('#dropdownContent')) {
          console.warn('clicked the content');
          return;
        }

        if (evt.target.closest('#dropdownHeader')) {
          console.warn('clicked the header');
          this.setState({isActive: !isActive});
        }

        console.warn('clicked outside target');
        if (isActive) {
          this.setState({isActive: false});
        }
      });
  }
  
  render() {
    const { isActive } = this.state;
    const items = [
      { value : 'User1' }, 
      { value : 'User2' }, 
      { value : 'User3' }, 
      { value : 'User4' }, 
      { value : 'User5' } 
    ];
    
    return (
      
      <div id="container">
        <h1>Class Component Test</h1>

        <p>Counter test</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
        <p></p>

        <button className="btn-secondary" id="dropdownHeader">select option</button>
        {isActive && (
          <select id="dropdownContent">
          {items.map((i) => (
            <option id="item" key={i.value}>
            {i.value}
            </option>
          ))}
          </select>
        )}
      </div>
    );
  }
}
