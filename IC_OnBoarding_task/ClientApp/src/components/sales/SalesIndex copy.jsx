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
       editModal: false,
       deleteModal: false,
       createModal: false,
       a_vec : [1, 2, 3, 4, 5],    
       drop_down_value: '', 
       drop_down_customer: '',
       drop_down_product : '',
       drop_down_store : '',
    };
    const { customers, sales, products, stores } = this.state;

  }
  


  scroll_down = () => {
    //console.log("accessing list :");
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          
          <label>
            Pick your item:
            <select value={this.state.drop_down_value} onChange={this.changeHandler_dropdown}>
              {this.state.sales.map(s => {
                return (
                <option>{s.id}</option>
                )
              })}

            </select>
          </label>
          {/* <button onClick={() => this.changeHandler_dropdown}>select</button> */}
          <button onClick={() => this.changeHandler_dropdown}>select</button>
          {/* <input type="submit" value="Submit"/> */}
        </form>
      </div>
    )
  }
  


  changeHandler = e => {
    this.setState({ 
      [e.target.date]: e.target.value,
      [e.drop_down_customer]: e.target.value,
      [e.drop_down_product]: e.target.value,  
      [e.drop_down_store]: e.target.value,  
        
      
     })
  }
  changeHandler_dropdown = e => {
    this.setState({
      drop_down_value : e.target.value,
    })
  }

  submitHandler = e => {
    e.preventDefault();
    console.log("state value: "+ this.state.drop_down_value);
  }
  submitHandler_dropdown = e => {
    e.preventDefault();
    this.fetchSales();
    console.log("selected sales: "+ this.state.sales.customer);
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



 
  createSales = e => {
    e.preventDefault();
    console.log(this.state);
    axios.post(`/Sales/PostSales`, 
    this.state
      // ({
      //   [e.target.id]: e.target.value,
      //   [e.target.name]: e.target.value,
      //   [e.target.product]: e.target.value, 
      // })  
    )
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
        <Button className="btn btn-primary" onClick={this.createModalOn}>Create Sales</Button>
              <Modal open={this.state.createModal} onClose={this.createModalOff} >
                <h1>Create new Sales</h1>
                <form>
                <i>Date Sold:  </i><br></br>
                <input type="text" name="dateSold" onChange={this.changeHandler_dropdown}/>
                <br></br><i>Customers:  </i>
                <select value={this.state.drop_down_value} onChange={this.changeHandler_dropdown}>
                  {this.state.customers.map(c => {
                    return (
                    <option>{c.name}</option>
                    )
                })}
                </select>
                <br></br><i>Products:  </i>
                <select value={this.state.drop_down_value} onChange={this.changeHandler}>
                  {this.state.products.map(p => {
                    return (
                    <option>{p.name}</option>
                    )
                })}
                 </select>
                 <br></br><i>Stores:  </i>
                <select value={this.state.drop_down_value} onChange={this.changeHandler}>
                  {this.state.stores.map(s => {
                    return (
                    <option>{s.name}</option>
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
        <Button className="btn btn-secondary" onClick={() => this.editModalOn(id)}>
          Edit
          <i className='btn btn-secondary'></i>
          </Button>
              <Modal 
              open={this.state.editModal[id]} 
              onClose={() => this.editModalOff(id)} >
                <div>
                  <h2>Edit Sales</h2>
                  <form>
                    <i>ID: </i><input type="text" name="id" onChange={this.changeHandler}/><br></br>
                    <i>Name: </i><input type="text" name="name" onChange={this.changeHandler}/><br></br>
                    <i>Price: </i><input type="text" name="price" onChange={this.changeHandler}/>
                  </form>
                <Button className="btn btn-primary" onClick={() => this.putSales(id)}>update</Button>
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
          {/* {sales.map(s => {
            return ( */}
              <div>
                <form onSubmit={this.submitHandler_dropdown}>
                  <label>
                    Select Sales: 
                    <select value={this.state.drop_down_value} onChange={this.changeHandler_dropdown}>
                      {sales.map(s => {
                        return (
                          <option>{s.customerId}</option>
                        );
                      })}
                    </select>
                  </label>
                  <button onClick={() => this.changeHandler_dropdown}>select</button>
                  {/* <input type="submit" value="Submit"/> */}
                </form>
                </div>
            
          {/* })} */}



          {this.scroll_down()}


          </div>
    ); 
    }


}