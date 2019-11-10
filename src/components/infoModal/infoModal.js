import React, { Component } from "react";

export default class InfoModal extends Component {
  render() {
    return this.props.data.map(item => (
      <div
        key={"k1 - " + item.itemCode}
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
              {item.suppliers.map(supplier =>
                supplier.length > 0 ? (
                  <div key={this.props.counter++}>
                    <p>Supplier name: {supplier.name}</p>
                    <p>Supplier country: {supplier.country}</p>
                    <hr />
                  </div>
                ) : null
              )}
              {item.priceReduction !== null ? (
                <div>
                  <p>Price reduction: {item.priceReduction.reducedPrice}</p>
                  <p>
                    Start date: {this.props.formatDate(item.priceReduction.startDate)}
                  </p>
                  <p>
                    End date: {this.props.formatDate(item.priceReduction.endDate)}
                  </p>
                </div>
              ) : null}
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
    ));
  }
}
