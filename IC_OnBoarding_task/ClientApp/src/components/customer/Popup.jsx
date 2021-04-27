import React, { Component } from 'react';

export class Popup extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup-inner'>
        <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close</button>
      </div>
      </div>
    );
  }
}

export default Popup