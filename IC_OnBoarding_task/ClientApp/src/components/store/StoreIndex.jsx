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
      last_id: 0,
      stores : [],
       editModal: false,
       deleteModal: false,
       createModal: false,
    };
    
  }

  increment = () => {
    this.setState({
      id: this.state.id + 1,
    })
    console.log("ID: "+ this.state.id);
  }

  highestIDReturn = () => {
    if (this.state.stores.length === 0){
      console.log("store length: 0");
      this.setState({ id: 1})
    }
    else if (this.state.id > 0) {
          var last_id = Math.max.apply(Math,this.state.stores.map(st => st.id)); 
          console.log("Last id: "+ last_id);  
          this.setState({ id: last_id + 1 } , () => {
          console.log("highest ID : " + last_id);
          console.log("ID will be: " + this.state.id);
          //alert("ID :" + this.state.id);
          }) 
        }
    else { alert("No Action"); }    
    }

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

//--------------------------------Http axios functions---------------------------------------

  fetchStore = () => {
    console.log("Fetching Store");
    axios
      .get("/Stores/GetStore")
      .then((res) => {
        console.log(res.data);
        this.setState({
          stores : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };


  createStore = e => {
    e.preventDefault();
    this.increment();
    axios.post(`/Stores/PostStore`, {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address
    })
    .then(json => {
      if(json) {
        alert("Data Saved Successfully");
        this.props.history.push('/store')
        this.fetchStore();
      }
      else {
        alert('Data not saved');
        this.props.history.push('/store')}
      })
      this.createModalOff();
       
      this.props.history.push('/store');
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
        <Button className="btn btn-primary" onClick={this.createModalOn}>Create Store</Button>
              <Modal open={this.state.createModal} onClose={this.createModalOff} >
                <h1>Create new Store</h1>
                <form>
                  <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler}/><br></br>
                  <i>Address: </i><br></br><input type="text" name="address" onChange={this.changeHandler}/>
                </form>
                <Button className="btn btn-primary" onClick={this.createStore}>Create</Button>
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
      editModal : false}) 
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
      {[id] : true }
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
    this.setState({id: 1});
    this.fetchStore();
  }
  componentDidUpdate() {
    console.log("Component did update!!!!!!!!");
    //this.highestIDReturn();
    //console.log("STATE: ", this.state);
  }

  render() {
    const { stores } = this.state;
    return (
      <div>
        <h1>Store</h1>
        {this.displaycreateModal()}
        <h2>ID: {this.state.id} </h2>
        <button onClick={this.highestIDReturn}>Return highest ID</button>
        <button onClick={this.increment}>Increment</button>
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