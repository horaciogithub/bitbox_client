import React, { Component } from "react";
import axios from "axios";

export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      price: 0,
      state: 'ACTIVE',
      creator: {
        id: JSON.parse(sessionStorage.getItem("userData")).id,
      },
      reducedPrice: 0,
      startDate: '',
      endDate: ''
      
    };
    // this.formHandler = this.formHandler.bind();
  }

  formHandler = (itemCode, refresh) => {
    let data = {  
      "itemCode": itemCode,
      "description": this.state.description,
      "price": this.state.price,
      "state": this.state.state,
      "creator": this.state.creator,
      "priceReduction": {
        "reducedPrice": this.state.reducedPrice,
        "startDate": this.state.startDate,
        "endDate": this.state.endDate,
      }
    }

    axios
        .put(`http://localhost:8180/items/update`, data)
        .then(res => {
         console.log(res.status)
         refresh()
        });
  };

  inputHandler = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {

    console.log(this.state)
    let Select = (<select name="supplier" onChange={ this.inputHandler }>
                    <option value="">-</option>
                  {this.props.suppliers.map(supplier=> (
                      <option key={supplier.id} value={supplier.id}>{supplier.name + ' - ' + supplier.country}</option>
                  ))}
   
                </select>);
    
    return this.props.data.map(item => (
      <div
        key={"k1 - " + item.itemCode}
        className="modal fade"
        id={"updte" + item.itemCode}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {"Modify item " + item.itemCode}
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
              <div className="form-group">
                <input type="text" name="description" placeholder="Description" onChange={ this.inputHandler }/>
                <input type="text" name="price" placeholder="Price" onChange={ this.inputHandler }/>
              </div>
              <div className="form-group">
                <select name="state" onChange={ this.inputHandler }>
                  <option value="ACTIVE" defaultValue>ACTIVE</option>
                  <option value="DISCONTINUED">DISCONTINUED</option>
                </select>
                {Select}
              </div>
              <div className="form-group">
                <input type="text" name="priceReduction" placeholder="Price reduction" onChange={ this.inputHandler }/>
                <input type="text" name="startDate" placeholder="Start date" onChange={ this.inputHandler }/>
                <input type="text" name="endDate" placeholder="End date" onChange={ this.inputHandler }/>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={(e) => this.formHandler(item.itemCode, this.props.refreshTable)}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}
