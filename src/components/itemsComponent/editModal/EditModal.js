import React, { Component } from "react";
import axios from "axios";


export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateReason: ""
    };

    this.reasonHandler = this.reasonHandler.bind();
    this.formHandler = this.formHandler.bind();
  }

  reasonHandler = e => {
    this.setState({ stateReason: e.target.value });
  };

  formHandler = (itemCode, refresh) => {
    if (this.state.stateReason.length > 0) {
      axios
        .put(`http://localhost:8180/items/deactivate`, {
          itemCode:itemCode,
          stateReason: this.state.stateReason
        })
        .then(res => {
         console.log(res.status)
         refresh()
        });
    }
  };

  render() {
    return this.props.data.map(item => (
      <div
        key={"k1 - " + item.itemCode}
        className="modal fade"
        id={"edit" + item.itemCode}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {"Deactivate item " + item.itemCode}
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
                <textarea
                  className="form-control"
                  name="stateReason"
                  cols="30"
                  rows="10"
                  placeholder="Describe reason....."
                  onChange={this.reasonHandler}
                ></textarea>
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
