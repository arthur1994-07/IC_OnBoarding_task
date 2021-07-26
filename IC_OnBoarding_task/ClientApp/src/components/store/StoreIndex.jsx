import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Col, Image , Icon, Label, Menu, Table , TableCell, Button, Popup, Placeholder, Header} from 'semantic-ui-react'
import { tokenToString } from 'typescript';


export class StoreIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 0,
      stores : [{}],
       editModal: false,
       deleteModal: false,
       createModal: false,
       a_vec : [1, 2, 3, 4, 5],       
    };
    
  }
  changeHandler = e => {
    this.setState({ 
      id: this.state.stores.length + 1 ,
      [e.target.name]: e.target.value,
      [e.target.address]: e.target.value,  
     })
  }

  changeHandler2 = e => {
    this.setState({
      id: this.state.currentCount,
      [e.target.name]: e.target.value,
      [e.target.address]: e.target.value,
    })
  }
  incrementCounter = () => {
    if (this.state.currentCount < this.state.stores.length){
      this.setState({
        currentCount: this.state.currentCount + 1,
      });    
      console.log("ID will be: " + this.state.currentCount);
    }
    console.log("customers length: "+ this.state.stores.length);
  }
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
  }

  fetchStore = () => {
    console.log("Fetching Store");
    axios
      .get("/Stores/GetStore")
      .then((res) => {
        console.log(res.data);
        this.setState({
          stores : res.data,
          //openModal: false
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };


  createStores = e => {
    e.preventDefault();
    console.log(this.state);
    if (this.state.currentCount >= this.state.stores.length){
      axios.post(`/Stores/PostStore`, this.state
      // {
      //   id: 10,
      //   name: "Cust4",
      //   address: "HK",
      //   email: "arthurchiuchiu@outlook.com",
      // }  
      )
    }
    this.incrementCounter();
    console.log(this.state);
    this.fetchStore();
  }

  putStore = (id) => { // take putProduct_by_id from MVC controller 

    console.log(this.state);
    axios.put("/Stores/Put_Store_by_id/"+id , this.state
    )

    console.log(this.state);
    console.log("put at: "+ id);
    this.fetchStore();
  }

  deleteStore = (id) => {
    axios.delete("/Stores/DeleteStore/"+id)
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      this.fetchStore();
      console.log(e);
    });
  }
  
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
        <Button className="btn btn-primary" onClick={this.createModalOn}>Create Store</Button>
              <Modal open={this.state.createModal} onClose={this.createModalOff} >
                <h1>Create new Store</h1>
                <form>
                  {/* <i>ID: </i><br></br><input type="text" name="id" onChange={this.changeHandler}/><br></br> */}
                  <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler}/><br></br>
                  <i>Address: </i><br></br><input type="text" name="address" onChange={this.changeHandler}/>
                </form>
                <h2>Enter new Store Name</h2> 
                <Button className="btn btn-primary" onClick={this.createStores}>Create</Button>
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
              open={this.state.editModal[id]} 
              onClose={() => this.editModalOff(id)} >
                <div>
                  <h2>Edit Store</h2>
                  <form>
                    {/* <i>ID: </i><br></br><input type="text" name="id" onChange={this.changeHandler}/><br></br> */}
                    <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler2}/><br></br>
                    <i>Address: </i><br></br><input type="text" name="address" onChange={this.changeHandler2}/>
                  </form>
                <Button className="btn btn-primary" onClick={() => this.putStore(id)}>update</Button>
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
        <Button onClick={() => this.deleteStore(id)} onClose={this.deleteModalOff}>Yes</Button>
        </Modal>
      </div>
    )
  }

  componentDidMount()  {
    console.log("Component did mount");
    this.fetchStore();
  }
  render() {
    const { stores } = this.state;
    //const { id, name, address } = this.state.customers;
    // console.log(this.state.a_vec);
    // const mapped_vec = this.state.a_vec.map((num) => num *2);
    // console.log(mapped_vec);

    return (
      <div>
        <h1>Store</h1>
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
              {stores.map(s  => {
                  return (
                    <Table.Row key={s.id} >
                    <Table.Cell>{s.name}</Table.Cell>
                    <Table.Cell>{s.address}</Table.Cell>
                    <Table.Cell >                    
                     {this.displayeditModal(s.id)} 
                        
                    </Table.Cell>
                    <Table.Cell>
                      {this.displaydeleteModal(s.id)}
                      {/* <Button  className="btn btn-primary" onClick={() => this.deleteModalOn(s.id)}>Delete</Button>
                      <Modal 
                      open={this.state.deleteModal[s.id]} 
                      onClose={this.deleteModalOff}>
                      <h1>Are you sure?</h1>
                      <Button  onClick={() => this.deleteStore(s.id)} onClose={this.deleteModalOff}>Yes</Button>
                       </Modal> */}

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
export default StoreIndex