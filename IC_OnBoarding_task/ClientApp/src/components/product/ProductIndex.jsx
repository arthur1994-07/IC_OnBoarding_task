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
      currentCount: 0,
      products: [],  
      editModal: false,
      deleteModal: false,
      createModal: false,
      a_vec : [1, 2, 3, 4, 5],       
    };
    
  }

  incrementCounter = () => {
    var last_id = Math.max.apply(null, this.state.products.map(prod => prod.id))      
    this.setState({
        id: last_id + 1,
      });    
      console.log("ID will be: " + this.state.currentCount);
    console.log("product length: "+ this.state.products.length);

  }


  changeHandler = e => {
    this.setState({ 
      [e.target.name]: e.target.value,
      [e.target.price]: e.target.value,
     })
  }

  changeHandler2 = e => {
    this.setState({
      id: this.state.currentCount,
      [e.target.name]: e.target.value,
      [e.target.price]: e.target.value,
    })
  }



  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
  }

  fetchProduct = () => {
    console.log("Fetching Product");
    axios
      .get("/Products/GetProduct")
      .then((res) => {
        console.log(res.data);
        this.setState({
          products : res.data,
          //openModal: false
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  

  createProduct = e => {
    this.incrementCounter();
    e.preventDefault();
    //console.log(this.state);
      axios.post(`/Products/PostProduct`, {
        id: this.state.id,
        name: this.state.name,
        price: this.state.price
      })
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      this.fetchCustomer();
      console.log(e);
    });
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
      // currentCount : this.state.currentCount + 1,
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
        <Button className="btn btn-primary" onClick={this.createModalOn}>Create Product</Button>
              <Modal open={this.state.createModal} onClose={this.createModalOff} >
                <h1>Create new Product</h1>
                <form>
                  {/* <i>ID: </i><br></br><input type="text" name="id" onChange={this.changeHandler}/><br></br> */}
                  <i>Name: </i><br></br><input type="text" name="name" onChange={this.changeHandler}/><br></br>
                  <i>Price: </i><br></br><input type="text" name="price" onChange={this.changeHandler}/>
                </form>
                <h2>Enter new Product</h2> 
                <Button className="btn btn-primary" onClick={this.createProduct}>Create</Button>
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
        <Button onClick={() => this.deleteProduct(id)} onClose={this.deleteModalOff}>Yes</Button>
        </Modal>
      </div>
    )
  }


  componentDidMount()  {
    console.log("Component did mount");
    this.fetchProduct();
  }

  render() {
    const { products } = this.state;
    //const { id, name, address } = this.state.customers;
    // console.log(this.state.a_vec);
    // const mapped_vec = this.state.a_vec.map((num) => num *2);
    // console.log(mapped_vec);
    
  return (
    <div>
      <h1>Product</h1>
      {/* <button className="btn btn-primary" onClick={this.createCustomer}>New Customer</button> */}
      {this.displaycreateModal()}
      {/* <button className="btn btn-primary" onClick={this.onClickButton}>Modal</button> */}
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
                    {/* <Button  className="btn btn-primary" onClick={() => this.deleteModalOn(p.id)}>Delete</Button>
                    <Modal 
                    open={this.state.deleteModal[p.id]} 
                    onClose={this.deleteModalOff}>
                    <h1>Are you sure?</h1>
                    <Button  onClick={() => this.deleteProduct(p.id)} onClose={this.deleteModalOff}>Yes</Button>

                     </Modal>
                      */}
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