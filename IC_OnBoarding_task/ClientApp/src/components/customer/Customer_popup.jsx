import React, { Component } from 'react';
import Popup from './Popup';

export class Customer_popup extends Component {
  
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }


  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log(this.showPopup)
  }

  render() {
    return ( 
      <div className='app'>
        <h1>Popup testing page</h1>
        <button onClick={this.togglePopup.bind(this)}>show popup</button>
        <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>
        <p>Testing popup page 1</p>
        {this.state.showPopup ? (
          <Popup text='Terminate' closePopup={this.togglePopup.bind(this)}>

          </Popup>
        ) : (null)
        
          }
        
      </div>
    );
  }
};




