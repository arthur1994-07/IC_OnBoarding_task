import React, { Component } from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CustomerIndex from './CustomerIndex';
import CustomerListTable from "./CustomerListTable";



export class ModalInClassComponents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      openModal : false
      
    };
  }

    onClickButton = e => {
        e.preventDefault()
        this.setState({openModal : true})
    }

    onCloseModal = () => {
        this.setState({openModal : false})
    }
    displayModal = () => {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.onClickButton}>Modal test</button>
                <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                    <h1>Sucessful modal!</h1>
                    <h2>Input information</h2>
                    <h3>Input name</h3>
                </Modal>   
               
        </div>
      )
    }

    render() {
      // const ModalInClassComponents = (props) => {
      //   const {openModal, onClickButton, onCloseModal, displayModal} = props;
      // }
        return (
            <div>
                {this.displayModal()}

              {/* <CustomerIndex openModal={this.openModal} onClickButton={this.onClickButton} onCloseModal={this.onCloseModal} displayModal={this.displayModal}/>  */}
            </div>
        )
    }  
}

export default ModalInClassComponents;