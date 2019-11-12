import React, { Component } from "react";

export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateReason: ""
    };
    // this.formHandler = this.formHandler.bind();
  }

  // formHandler = (itemCode, refresh) => {
    
  // };

  render() {


   let Select = (<select name="">
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
                <input type="text" placeholder="Description"/>
                <input type="text" placeholder="Price"/>
              </div>
              <div className="form-group">
                <select name="">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="ACTIVE">DISCONTINUED</option>
                </select>
                <input type="text" placeholder="Creator"/>
              </div>
              <div className="form-group">
                {Select}
                <input type="text" placeholder="Price reduction"/>
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
