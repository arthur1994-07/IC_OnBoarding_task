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
      test_count: 1,
      customers: [],
      editModal: false,
      deleteModal: false,
      createModal: false,
    }
    this.incrementCounter = this.incrementCounter.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  
  }
  
  updateState = () => {
    console.log('Changing state');
    this.setState({test_count: this.state.test_count + 1}, () => { console.log("new state",this.state);})
  }
  // 

  incrementCounter = () => {
    var last_id = Math.max.apply(Math,this.state.customers.map(cus => cus.id)) ; 
    
    // if (last_id === 0) {
    //   alert("Error");
    // }
    // else
    // { 
      this.setState({id: last_id + 1} , () => {
        console.log("highest ID : " + last_id);
        console.log("ID will be: " + this.state.id);
      }) 
    }
 // }
    

  
  changeHandler = e => {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.address]: e.target.value,
      }, 
      () => { 
        console.log("handler state: " + this.state);
      }
      );    
    };
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
          //openModal: false
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  createCustomer = e => {


    console.log(this.state);
    e.preventDefault();
    this.incrementCounter();
    
    

      axios.post(`/Customers/PostCustomer`, {
        id: this.state.id,
        name: this.state.name,
        address: this.state.address 
      })
      .then(json => {
        if (json){
        alert("Data Saved Successfully");
        this.props.history.push('/customer')
      }
      else {
        alert('Data not saved');
        this.props.history.push('/customer')}
      })
      this.createModalOff();
      
      this.fetchCustomer();  
      this.props.history.push('/customer');
    }
    


  // createCustomer2 = e => {
  //   e.preventDefault();
  //   //console.log(this.state);
  //   this.incrementCounter();
  //   axios.post(`/Customers/PostCustomer` ,
  //     {

  //       id: this.state.currentCount,
  //       name: "Arthur from state",
  //       address: "this.state",
        
  //     }
  //   )
  //   console.log("Customer: "+ this.state.customers);    
  //   console.log(this.state);
  //   this.fetchCustomer();
  // }
  putCustomer = (id) => { // take putCustomer_by_id from MVC controller 
    console.log(this.state);
    axios.put("/Customers/Put_Customer_by_id/"+id , this.state
    )
    console.log(this.state);
    console.log("put at: "+ id);
    this.fetchCustomer();
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
      {
        [id] : true,
      },
    });
    console.log("edit modal on "+ id);
  }
  editModalOff = (id) => {
    this.setState({
      editModal : false
      // {
      //    [id] : false,
      // },
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
    document.title = `customer ID is ${this.state.id}`;
    this.fetchCustomer();
  }
  componentDidUpdate() {
    console.log("Component did update!!!!!!!!");
    console.log("STATE: ", this.state);

  }




  render() {
      const { customers } = this.state;      
    return (
      <div>
        <h1>Customer</h1>
        <div>
        <button onClick={this.updateState}>Change state</button>
        <h2>ID: {this.state.id} </h2>
        </div>
        {/* <button className="btn btn-primary" onClick={this.createCustomer}>New Customer</button> */}
        {this.displaycreateModal()}
        {/* <button className="btn btn-primary" onClick={this.onClickButton}>Modal</button> */}
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
                      {/* <Button  className="btn btn-primary" onClick={() => this.deleteModalOn(c.id)}>Delete</Button>
                      <Modal 
                      open={this.state.deleteModal[c.id]} 
                      onClose={this.deleteModalOff}>
                      <h1>Are you sure?</h1>
                      <Button  onClick={() => this.deleteCustomer(c.id)} onClose={this.deleteModalOff}>Yes</Button>
                       </Modal> */}
                    </Table.Cell>
                    </Table.Row>
                  );
                })}
             </Table.Body>
          </Table>
          {/* <CustomerListTable customers={customers} fetchCustomer={this.fetchCustomer} deleteCustomer={this.deleteCustomer} edit_function={this.edit_function} />  */}
          </div>
    ); 
  }
}
export default CustomerIndex