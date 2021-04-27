import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Col, Image , Icon, Label, Menu, Table , TableCell, Button, Popup, Placeholder, Header, Dropdown} from 'semantic-ui-react'
import { isAsExpression, tokenToString } from 'typescript';
import { CustomerIndex } from '../customer/CustomerIndex';
import { ProductIndex } from '../product/ProductIndex';
import { StoreIndex } from '../store/StoreIndex';



export class FlavorForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: []
                    
       };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit2 = this.handleSubmit2.bind(this);
    }
  
    handleChange(event) {
      this.setState({
        value: 
        [event.target.value]
      });
      console.log("dropdown value: "+ event.target.value);
    }
  
    handleSubmit(event) {
      //alert('Your favorite flavor is: ' + this.state.value);
      console.log('chose flavor is: ' + this.state.value);
      event.preventDefault();
    }
  
      handleChange2(event) {
      this.setState({
        value2: event.target.value
      });
    }
  
    handleSubmit2(event) {
      //alert('Your favorite flavor is: ' + this.state.value);
      console.log('chose second flavor is: ' + this.state.value2);
      event.preventDefault();
    }
    
    
  
    render() {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
        </form>
           <form onSubmit={this.handleSubmit}>
          <label>
            Pick your second favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
              <option value="pear">Pear</option>
              <option value="strawberry">Strawberry</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
           </div>
        
      );
    }
  }
  
