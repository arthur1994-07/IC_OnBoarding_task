/* eslint-disable react/jsx-pascal-case */
import React, { Component , Form, useState} from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Col, Image , Icon, Label, Menu, Table , TableCell, Button, Popup, Placeholder, Header} from 'semantic-ui-react'
import { tokenToString } from 'typescript';


export class CustomerIndex extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      customers: [{
      }],
       editModal: false,
       deleteModal: false,
       createModal: false,
       a_vec : [1, 2, 3, 4, 5],       
    };
    
  }
  // 
  changeHandler = e => {
    this.setState({ 
      [e.target.id]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.address]: e.target.value,  
     })
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
  }

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
  };

  createCustomer = e => {
    e.preventDefault();
    console.log(this.state);
    axios.post(`/Customers/PostCustomer`, this.state,
    // {
    //     id: 10,
    //     name: "Cust4",
    //     address: "HK",
    //     email: "arthurchiuchiu@outlook.com",
    //   }

    )
    console.log(this.state);
    this.fetchCustomer();
  }

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
                  <i>ID: </i><br></br><input type="text" name="id" onChange={this.changeHandler}/><br></br>
                  <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler}/><br></br>
                  <i>Address: </i><br></br><input type="text" name="address" onChange={this.changeHandler}/>
                </form>
                <h2>Enter new Customers Name</h2> 
                <Button className="btn btn-primary" onClick={this.createCustomer}>Create</Button>
              </Modal>   
      </div>
    )
  }
  editModalOn = (id) => {
    this.setState({
      editModal: 
      //true
      {
        [id] : true,
      },
    });
    console.log("edit modal on "+ id);
  }


  editModalOff = (id) => {
    this.setState({
      editModal : 
      false
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
                    <i>ID: </i><br></br><input type="text" name="id" onChange={this.changeHandler}/><br></br>
                    <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler}/><br></br>
                    <i>Address: </i><br></br><input type="text" name="address" onChange={this.changeHandler}/>
                  </form>
                <Button className="btn btn-primary" onClick={() => this.putCustomer(id)}>update</Button>
                </div>
                
              </Modal>   


      </div>
    )
  }
  deleteModalOn = (id) => {
    this.setState({
      deleteModal: 
      //true
      {
        [id] : true
      }
    })
    console.log("delete modal on");
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
    this.fetchCustomer();
  }


  render() {
      const { customers } = this.state;
      //const { id, name, address } = this.state.customers;
      // console.log(this.state.a_vec);
      // const mapped_vec = this.state.a_vec.map((num) => num *2);
      // console.log(mapped_vec);
      
    return (
      <div>
        <h1>Customer</h1>
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