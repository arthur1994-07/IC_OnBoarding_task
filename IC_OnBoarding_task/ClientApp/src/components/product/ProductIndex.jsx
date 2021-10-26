import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Col, Image , Icon, Label, Menu, Table , TableCell, Button, Popup, Placeholder, Header} from 'semantic-ui-react'
import { tokenToString } from 'typescript';


export class ProductIndex extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      last_id: 0,
      products: [],  
      editModal: false,
      deleteModal: false,
      createModal: false,
      a_vec : [1, 2, 3, 4, 5],       
    };
    
  }

  increment = () => {
    this.setState({
      id: this.state.id + 1,
    })
    console.log("ID: "+ this.state.id);
  }

  highestIDReturn = () => {
    if (this.state.products.length === 0){
      console.log("product length: 0");
      this.setState({ id: 1})
    }
    else if (this.state.id > 0) {
          var last_id = Math.max.apply(Math,this.state.products.map(prod => prod.id)); 
          console.log("Last id: "+ last_id);  
          this.setState({ id: last_id + 1 } , () => {
          console.log("highest ID : " + last_id);
          console.log("ID will be: " + this.state.id);
          //alert("ID :" + this.state.id);
    }) 
        }
    else {
      alert("No Action");
      }    
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


  fetchProduct = () => {
    console.log("Fetching Product");
    axios
      .get("/Products/GetProduct")
      .then((res) => {
        console.log(res.data);
        this.setState({
          products : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  

  createProduct = e => {
    e.preventDefault();
    this.increment();
    //console.log(this.state);
      axios.post(`/Products/PostProduct`, {
        id: this.state.id,
        name: this.state.name,
        price: this.state.price
      })
      .then(json => {
        if(json) {
          alert("Data Saved Successfully");
          this.props.history.push('/product')
          this.fetchProduct();
        } 
        else {
          alert("Data not saved");
          this.props.history.push('/product')}
        })
        this.createModalOff();
        this.props.history.push('/product');
        this.fetchProduct();
      }



  putProduct = (id) => { // take putProduct_by_id from MVC controller 

    console.log(this.state);
    axios.put("/Products/Put_Product_by_id/"+id , this.state
    )
    console.log(this.state);
    console.log("put at: "+ id);
    this.fetchProduct();
  }

  deleteProduct = (id) => {
    axios.delete("/Products/DeleteProduct/"+id)
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      this.fetchProduct();
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
        <Button className="btn btn-primary" onClick={this.createModalOn}>Create Product</Button>
              <Modal open={this.state.createModal} onClose={this.createModalOff} >
                <h1>Create new Product</h1>
                <form>
                  {/* <i>ID: </i><br></br><input type="text" name="id" onChange={this.changeHandler}/><br></br> */}
                  <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler}/><br></br>
                  <i>Price: </i><br></br><input type="text" name="price" onChange={this.changeHandler}/>
                </form>
                <Button className="btn btn-primary" onClick={this.createProduct}>Create</Button>
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
              open={this.state.editModal[id]} 
              onClose={() => this.editModalOff(id)} >
                <div>
                  <h2>Edit Product</h2>
                  <form>
                    {/* <i>ID: </i><br></br><input type="text" name="id" onChange={this.changeHandler}/><br></br> */}
                    <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler2}/><br></br>
                    <i>Price: </i><br></br><input type="text" name="price" onChange={this.changeHandler2}/>
                  </form>
                <Button className="btn btn-primary" onClick={() => this.putProduct(id)}>update</Button>
                </div>         
              </Modal>   
      </div>
    )
  }
  deleteModalOn = (id) => {
    this.setState({
      deleteModal:  { [id] : true }
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
        <Button onClick={() => this.deleteProduct(id)} onClose={this.deleteModalOff}>Yes</Button>
        </Modal>
      </div>
    )
  }

  componentDidMount()  {
    console.log("Component did mount");
    this.setState({id: 1});
    this.fetchProduct();
  }
  componentDidUpdate() {
    console.log("Component did update!!!!!!!!");
    //this.highestIDReturn();
    //console.log("STATE: ", this.state);
  }



  render() {
    const { products } = this.state;
  return (
    <div>
      <h1>Product</h1>
      {this.displaycreateModal()}
      <h2>ID: {this.state.id} </h2>
      <button onClick={this.highestIDReturn}>Return highest ID</button>
      <button onClick={this.increment}>Increment</button>
      <Table celled>
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
          <Table.Body>
            {products.map(p  => {
                return (
                  <Table.Row key={p.id} >
                  <Table.Cell>{p.name}</Table.Cell>
                  <Table.Cell>{p.price}</Table.Cell>
                  <Table.Cell >                    
                   {this.displayeditModal(p.id)} 
                      
                  </Table.Cell>
                  <Table.Cell>
                   {this.displaydeleteModal(p.id)}
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

export default ProductIndex