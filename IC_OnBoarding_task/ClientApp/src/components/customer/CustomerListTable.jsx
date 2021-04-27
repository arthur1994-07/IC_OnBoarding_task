import React, {useState} from 'react';
import { Icon, Label, Menu, Table , TableCell, Button, Popup, Modal} from 'semantic-ui-react'
import axios from 'axios';
import Customer_app from './ModalInClassComponents';

const CustomerListTable = (props) => {
  const { customers, fetchCustomer, deleteCustomer ,edit_function } = props;





  // const testing_function_cs = (id) => {
  //   axios.get(`./Customers/testing_function_cs/${id}`)
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // };

  return (
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
      {customers.map(c => {
            return (
              <Table.Row key={c.id}>
                <Table.Cell>{c.name}</Table.Cell>
                <Table.Cell>{c.address}</Table.Cell>
                <Table.Cell>
                 <Button class="ui primary button" onClick={() => edit_function}>Edit</Button> 

                 </Table.Cell>
                <Table.Cell>
                  <Button class="ui secondary button" onClick={() => deleteCustomer(c.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default CustomerListTable