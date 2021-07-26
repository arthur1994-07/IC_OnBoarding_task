import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Col, Image , Icon, Label, Menu, Table , TableCell, Button, Popup, Placeholder, Header, Dropdown} from 'semantic-ui-react'
import { isAsExpression, tokenToString } from 'typescript';
import { CustomerIndex } from '../customer/CustomerIndex';
import { ProductIndex } from '../product/ProductIndex';
import { StoreIndex } from '../store/StoreIndex';

export class SalesIndex extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sales: [{
        
      }],
       customers : [{}],
       products : [{}],
       stores : [{}],
       currentCount : 0,
       editModal: false,
       deleteModal: false,
       createModal: false,
       a_vec : [1, 2, 3, 4, 5],    
       drop_down_value: '' ,
      //  drop_down_id: '' ,
       drop_down_customer: '',
       drop_down_product: '',
       drop_down_store: '',
      //  date_sold: '',
    };
    
    const { customers, sales, products, stores } = this.state;

  }
  
  incrementCounter = () => {
    if (this.state.currentCount < this.state.sales.length){
      this.setState({
        currentCount: this.state.currentCount + 1,
      });    
      console.log("Sales ID will be: " + this.state.currentCount);

    } 
    // else if (this.state.currentCount > this.state.sales.length){
    //   this.setState({
    //     currentCount: this.state.sales.length,
    //   });
    // }
      
    console.log("sales length: "+ this.state.sales.length);

  }

  
// ---------------------------------------------------------------------
  changeHandler_dropdown = (e) => { // for dropdown select input
    console.log('dropdown value: '+ e.target.value); 
    this.setState({
      //drop_down_value : [e.target.value],
      [e.target.name]: e.target.value,
    });
  }

 
  //----------------------------------------------------------------------
  changeHandler_dropdown_customer = (e) => { // for dropdown select input
    console.log('dropdown customer: '+ e.target.value); 
    this.setState({
      drop_down_customer : e.target.value,

      //[e.target.name]: e.target.value,
    });


  }
  submitHandler_customer = e => { // console print dropdown selection 
    e.preventDefault();
    console.log("state value: "+ this.state.drop_down_customer);
  }
  //---------------------------------------------------------------------
  changeHandler_dropdown_product = (e) => { // for dropdown select input
    console.log('dropdown product: '+ e.target.value); 
    this.setState({
      drop_down_product : e.target.value,
     // products: this.state.drop_down_product,
      //[e.target.name]: e.target.value,
      
    });
  }
  submitHandler_product = e => { // console print dropdown selection 
    e.preventDefault();
    console.log("state value: "+ this.state.drop_down_product);
  }
  //---------------------------------------------------------------------

  changeHandler_dropdown_store = (e) => { // for dropdown select input
    console.log('dropdown store: '+ e.target.value); 
    this.setState({
      drop_down_store : e.target.value,
      //stores: this.state.drop_down_store,
      //[e.target.name]: e.target.value,
    });
  }
  submitHandler_store = e => { // console print dropdown selection 
    e.preventDefault();
    console.log("state value: "+ this.state.drop_down_store);
  }


  //---------------------------------------------------------------------



  changeHandler = e => { // for text input 
    this.setState({   
       
      id: this.state.sales.length + 1,
      customer: this.state.drop_down_customer,
      product: this.state.drop_down_product,
      store: this.state.drop_down_store,
      [e.target.name]: e.target.value, 
     })
    
    
  }

  submitHandler = e => { // console print dropdown selection 
    e.preventDefault();
    console.log("state value: "+ this.state.drop_down_value);
  }



  getSales_by_id = (id) =>{
    console.log("get sales by id");
    axios
    .get("Sales/GetSales"/+id)
    .then((res) => {
      console.log(res.data);
      this.setState({
        sales : res.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
  };
  


 
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

  fetchSales = () => {
    console.log("Fetching sales");
    axios
      .get("/Sales/GetSales")
      .then((res) => {
        console.log(res.data);
        this.setState({
          sales : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };


 
  createSales = e => {
    e.preventDefault();
    console.log(this.state);
    if (this.state.currentCount >= this.state.sales.length) {
      axios.post(`/Sales/PostSales`, this.state, 
      )
    }
    this.incrementCounter();

    console.log(this.state);
    this.fetchSales();
  }

  putSales = (id) => { // take putProduct_by_id from MVC controller 
    console.log(this.state);
    axios.put("/Sales/Put_Sales_by_id/"+id , this.state
    )
    console.log(this.state);
    console.log("put at: "+ id);
    this.fetchProduct();
  }

  deleteSales = (id) => {
    axios.delete("/Sales/DeleteSales/"+id)
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
        <Button className="btn btn-primary" onClick={this.createModalOn}>Create New Sales</Button>
              <Modal className="popup" open={this.state.createModal} onClose={this.createModalOff} >
                <h1>Create New Sales</h1>
                <form onSubmit={this.submitHandler}>
                <i>Date Sold:  </i><br></br>
                <input type="text" name="dateSold" onChange={this.changeHandler}/>
                </form>

                <form onSubmit={this.submitHandler_customer}>
                <br></br><i>Customers:  </i><br></br>
                <select value={this.state.drop_down_customer} onChange={this.changeHandler_dropdown_customer}>
                  {this.state.customers.map(c => {
                    return (
                    <option value={c.name}>{c.name}</option>
                    )
                })}
                </select>
                </form>

                <form onSubmit={this.submitHandler_product}>
                <br></br><i>Products:  </i><br></br>
                <select value={this.state.drop_down_product} onChange={this.changeHandler_dropdown_product}>
                  {this.state.products.map(p => {
                    return (
                    <option value={p.name}>{p.name}</option>
                    )
                })}
                 </select>
                 </form>

                 <form onSubmit={this.submitHandler_store}>
                 <br></br><i>Stores:  </i><br></br>
                <select value={this.state.drop_down_store} onChange={this.changeHandler_dropdown_store}>
                  {this.state.stores.map(s => {
                    return (
                    <option value={s.name}>{s.name}</option>
                    )
                })}
                 </select>
                </form>
                
                <Button className="btn btn-primary" onClick={this.createSales}>Create</Button>
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
      <Button className="btn btn-primary" onClick={this.editModalOn}>Edit</Button>
            <Modal className="popup" open={this.state.editModal} onClose={this.editModalOff} >
              <h1>Edit Sales</h1>
              <form onSubmit={this.submitHandler}>
              <i>Date Sold:  </i><br></br>
              <input type="text" id="dateSold" onChange={this.changeHandler}/>
              </form>

              <form onSubmit={this.submitHandler_customer}>
              <br></br><i>Customers:  </i><br></br>
              <select value={this.state.drop_down_customer} onChange={this.changeHandler_dropdown_customer}>
                {this.state.customers.map(c => {
                  return (
                  <option value={c.name}>{c.name}</option>
                  )
              })}
              </select>
              </form>

              <form onSubmit={this.submitHandler_product}>
              <br></br><i>Products:  </i><br></br>
              <select value={this.state.drop_down_product} onChange={this.changeHandler_dropdown_product}>
                {this.state.products.map(p => {
                  return (
                  <option value={p.name}>{p.name}</option>
                  )
              })}
               </select>
               </form>

               <form onSubmit={this.submitHandler_store}>
               <br></br><i>Stores:  </i><br></br>
              <select value={this.state.drop_down_store} onChange={this.changeHandler_dropdown_store}>
                {this.state.stores.map(s => {
                  return (
                  <option value={s.name}>{s.name}</option>
                  )
              })}
               </select>
              </form>
              
              <Button className="btn btn-primary" onClick={this.putSales}>Edit</Button>
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
        <Button onClick={() => this.deleteSales(id)} onClose={this.deleteModalOff}>Yes</Button>
        </Modal>
      </div>
    )
  }




  componentDidMount()  {
    console.log("Component did mount");
    this.fetchProduct();
    this.fetchStore();
    this.fetchCustomer();
    this.fetchSales(); // it will fetch all data but only display the sales since its the final line of code 
    
  }

  render() {
    const { sales, customers , stores, products } = this.state;
    //const { id, name, address } = this.state.customers;
    // console.log(this.state.a_vec);
    // const mapped_vec = this.state.a_vec.map((num) => num *2);
    // console.log(mapped_vec);

    return (
      <div>
        <h1>Sales</h1>
        {/* <button className="btn btn-primary" onClick={this.createCustomer}>New Customer</button> */}
        {this.displaycreateModal()}
        {/* <button className="btn btn-primary" onClick={this.onClickButton}>Modal</button> */}
        <Table celled>
          <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
            <Table.Body>
              {sales.map(s  => {
                  return (
                    <Table.Row key={s.id} >
                    <Table.Cell>{s.customer}</Table.Cell>
                    <Table.Cell>{s.product}</Table.Cell>
                    <Table.Cell>{s.store}</Table.Cell>
                    <Table.Cell>{s.dateSold}</Table.Cell>

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

          {/* {this.scroll_down()} */}


          </div>
    ); 
    }


}