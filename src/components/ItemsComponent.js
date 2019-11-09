import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      itemCode: 0,
      description: '',
      state: 'ACTIVE',
      price: null,
      creator: null
    };
  }

  refreshTable = () => {
    axios
      .get(`http://localhost:8180/items/all`, {
        auth: {
          username: "horacio",
          password: "1234"
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
      });
  }

  clearInputs = () => {
    this.setState({
      itemCode: 0,
      description: '',
      state: 'ACTIVE',
      price: null,
      creator: null
    })

    document.getElementById('itemCode').value='';
    document.getElementById('description').value='';
    document.getElementById('price').value='';
  }

  componentDidMount() {
    this.refreshTable();
  }

  formatDate = (date) => {

    if(date !== null) {
      let dateArr = date.split('-');
      return dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
    } else {
      return date
    }
   
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  formHandler = () => {
    if(this.state.itemCode.length > 0 && this.state.description.length > 0) {
      axios
      .post(`http://localhost:8180/items/create`, {
          itemCode: this.state.itemCode,
          description: this.state.description,
          state: this.state.state,
          price: this.state.price,
          creator: {
            id: 1
          } 
      })
      .then(res => {
        this.refreshTable();
        this.clearInputs();
      });
    }
  }

  render() {

    console.log(this.state)
  
    let i = 1; // Suppliers second map id

    return (
      <div>
        {this.state.data != null ? (
          <table className="tabla table table-bordered table-hover" border="1">
            <thead>
              <tr>
                <th>Item code</th>
                <th>Description</th>
                <th>State</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Creator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="number" id="itemCode" name="itemCode" onChange={ this.inputHandler}/></td>
                <td><input type="text" id="description" name="description" onChange={ this.inputHandler}/></td>
                <td>
                  <select name="state" onChange={ this.inputHandler}>
                    <option value="ACTIVE" defaultValue>ACTIVE</option>
                    <option value="DISCONTINUED">DISCONTINUED</option>
                  </select>
                </td>
                <td><input type="text" id="price" name="price" onChange={ this.inputHandler}/></td>
                <td></td>
                <td></td>
                <td>
                  <button className="btn btn-primary" onClick={this.formHandler}>Add Item</button>
                </td>
              </tr>
              {this.state.data.map(item => (
                <tr key={item.itemCode}>
                  <td>{item.itemCode}</td>
                  <td>{item.description}</td>
                  <td>{item.state}</td>
                  <td>{item.price != null ? item.price + " €" : ''}</td>
                  <td>{this.formatDate(item.creationDate)}</td>
                  <td>{item.creator.name}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target={"#id" + item.itemCode}
                    >
                      See details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {this.state.data != null
          ? this.state.data.map(item => (
              <div  key= {"k1 - " + item.itemCode}
                className="modal fade"
                id={"id" + item.itemCode}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Item's details
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {item.suppliers.map(supplier => (
                        supplier.length > 0 ? 
                        <div key= {i++}>
                          <p>Supplier name: {supplier.name}</p>
                          <p>Supplier country: {supplier.country}</p>
                          <hr/>
                        </div> :null
                      ))}
                        {item.priceReduction !== null ? 
                          <div>
                            <p>Price reduction: {item.priceReduction.reducedPrice}</p>
                            <p>Start date: {this.formatDate(item.priceReduction.startDate)}</p>
                            <p>End date: {this.formatDate(item.priceReduction.endDate)}</p>
                          </div>
                          : null
                        }
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}
