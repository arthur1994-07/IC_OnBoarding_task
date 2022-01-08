/* eslint-disable react/jsx-pascal-case */
import React, { Component , Form, useState} from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Col, Image , Icon, Label, Menu, Table , TableCell, Button, Popup, Placeholder, Header} from 'semantic-ui-react'
import { tokenToString } from 'typescript';
import { throwStatement } from '@babel/types';
import "bootstrap/dist/css/bootstrap.min.css";



export class CustomerIndex extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      last_id: 0,
      customers: [],
      editModal: false,
      deleteModal: false,
      createModal: false,
      table_length: null,
    };
    this.increment = this.increment.bind(this);
    this.highestIDReturn = this.highestIDReturn.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  

  // 
  increment = () => {
    this.setState({
      id: this.state.id + 1,
    })
    console.log("ID: "+ this.state.id);
  }

  highestIDReturn = () => {
    if (this.state.customers.length === 0){
      console.log("customer length: 0");
      this.setState({ id: 1})
    }
    else if (this.state.id > 0) {
          var last_id = Math.max.apply(Math ,this.state.customers.map(cus => cus.id)); 
          console.log("Last id: "+ last_id);  
          this.setState({ id: last_id + 1 } , () => {
            console.log("highest ID : " + last_id);
            console.log("ID will be: " + this.state.id);
            // alert("ID :" + this.state.id);
          }) 
        }
    else { alert("No Action"); }    
    }

  changeHandler = e => {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.address]: e.target.value,
      }, () => { 
        console.log("handler state: " + this.state);
      });    
    }
    // e.target.value => selected input / typed input
    // [e.target.name] => input field name 
  //}



//--------------------------------Http axios functions---------------------------------------
  
  fetchCustomer = () => {
    console.log("Fetching Customer");
    axios
      .get("/Customers/GetCustomer")
      .then((res) => {
        console.log(res.data);
        this.setState({
          customers: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  createCustomer = e => {
    e.preventDefault();
    this.increment();
      axios.post(`/Customers/PostCustomer`, {
        id: this.state.id,
        name: this.state.name,
        address: this.state.address 
      })
      .then(json => {
        if (json){
        alert("Data Saved Successfully");
        this.props.history.push('/customer')
        this.fetchCustomer();
      }
      else {
        alert('Data not saved');
        this.props.history.push('/customer')}
      })
      this.createModalOff();
      this.props.history.push('/customer');
      this.fetchCustomer(); 
    }
    
  putCustomer = (id) => { // take putCustomer_by_id from MVC controller 
    console.log(this.state);
    // axios.put("/Customers/Put_Customer_by_id/"+id , this.state
    // )
    axios.put("/Customers/Put_Customer_by_id/"+id , {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address
    }).then(json => {
      if(json) {
         alert("Data Changed Successfully");

        this.editModalOff();
        this.props.history.push('/customer');
        this.fetchCustomer();
      }
      else {
        alert('Data not saved');
        this.props.history.push('/customer')
        }
      })
  }
  
  deleteCustomer = (id) => {
    axios.delete("/Customers/DeleteCustomer/"+id)
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      this.fetchCustomer();
      console.log(e);
    });
  }



  //------------------------------------ Modal functions---------------------------------------------

  createModalOn = () => {
    this.setState({
      createModal : true
    })
    this.highestIDReturn();
    console.log("create modal on");
  }
  createModalOff = () => {
    this.setState({
      createModal : false
    })
    console.log("create modal off");
  }

  displaycreateModal = () => { 
    return ( 
      <div>
        <Button className="btn btn-primary" onClick={this.createModalOn}>Create Customer</Button>
              <Modal open={this.state.createModal} onClose={this.createModalOff} >
                <h1>Create new Customer</h1>
                <form>
                  <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler.bind(this)}/><br></br>
                  <i>Address: </i><br></br><input type="text" name="address" onChange={this.changeHandler.bind(this)}/>
                </form>
                <br></br>
                <Button className="btn btn-primary" onClick={this.createCustomer.bind(this)}>Create</Button>
              </Modal>   
      </div>
    )
  }
  editModalOn = (id) => {
    this.setState({
      editModal: 
      { [id] : true },
    });
    console.log("edit modal on "+ id);
  }
  editModalOff = (id) => {
    this.setState({
      editModal : false
    }) 
    console.log("edit  modal off");
  }

  displayeditModal = (id) => {
    return (
      <div>
        <Button className="btn btn-secondary" onClick={() => this.editModalOn(id)}>
          Edit
          <i className='btn btn-secondary'></i>
          </Button>
              <Modal 
              classNames="Modal"
              open={this.state.editModal[id]} 
              onClose={() => this.editModalOff(id)} >
                <div>
                  <h2>Edit Customer</h2>
                  <form>
                    {/* <i>ID: </i><br></br><input type="text" name="id" onChange={this.changeHandler2}/><br></br> */}
                    <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler}/><br></br>
                    <i>Address: </i><br></br><input type="text" name="address" onChange={this.changeHandler}/>
                  </form>
                <Button className="btn btn-primary" onClick={() => this.putCustomer(id)} >update</Button>
                </div>
              </Modal>   
      </div>
    )
  }
  deleteModalOn = (id) => {
    this.setState({deleteModal: {[id] : true}})
    console.log("delete modal on: "+ id);
  }

  deleteModalOff = () => {
    this.setState({
      deleteModal : false
    })
    console.log("delete modal off");
  }
  displaydeleteModal = (id) => {
    return (
      <div>
        <Button className="btn btn-primary" onClick={() => this.deleteModalOn(id)}>Delete</Button>
        <Modal
        open={this.state.deleteModal[id]}
        onClose={this.deleteModalOff}>
          <h1>Are you sure?</h1>
        <Button onClick={() => this.deleteCustomer(id)} onClose={this.deleteModalOff}>Yes</Button>
        </Modal>
      </div>
    )
  }
//--------------------------------------------------------------

  componentDidMount()  {
    console.log("Component did mount");
    this.setState({id: 1});
    this.fetchCustomer();
  }
  
  componentDidUpdate() {
    console.log("Component did update!!!!!!!!");
  }




  render() {
      const { customers } = this.state;      
    return (
      <div>
        <h1>Customer</h1>
        <div>
        {/* <button onClick={this.updateState}>Change state</button> */}
        
        </div>
        {this.displaycreateModal()}
        {/* <h2>ID: {this.state.id} </h2>
        <button onClick={this.highestIDReturn}>Return highest ID</button>
        <button onClick={this.increment}>Increment</button> */}
        <Table celled>
          <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
            <Table.Body>
              {customers.map(c  => {
                  return (
                    <Table.Row key={c.id} >
                    <Table.Cell>{c.name}</Table.Cell>
                    <Table.Cell>{c.address}</Table.Cell>
                    <Table.Cell >                    
                     {this.displayeditModal(c.id)} 
                    </Table.Cell>
                    <Table.Cell>
                     {this.displaydeleteModal(c.id)}
                    </Table.Cell>
                    </Table.Row>
                  );
                })}
             </Table.Body>
          </Table>
          </div>
    ); 
  }
}
export default CustomerIndex