import React, { Component } from "react";

export default class InfoModal extends Component {
  render() {
    let i = 1; // Suppliers second id map
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
                Item { item.itemCode } details
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
                supplier.id !== null ? (
                  <div key={ i++ }>
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
                    Start date: {item.priceReduction.startDate}
                  </p>
                  <p>
                    End date: {item.priceReduction.endDate}
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
            </div>
          </div>
        </div>
      </div>
    ));
  }
}
