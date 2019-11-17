import React, { Component } from "react";
import axios from "axios";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./EditItem.css";

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    registerLocale("es", es);

    this.state = {
      description: "",
      price: null,
      creator: {
        id: JSON.parse(sessionStorage.getItem("userData")).id
      },
      supplier: "",
      reducedPrice: 0,
      startDate: new Date(),
      endDate: new Date()
    };
    // this.formHandler = this.formHandler.bind();
  }

  formattedDate = date => {
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  };

  isCorrectDate = (startDate, endDate) => {
    if(startDate >= endDate) {
      return false;
    } else {
      return true;
    }
  }

  formHandler = (itemCode, refresh) => {

    let startDate;
    let endDate;

    if(this.isCorrectDate(this.state.startDate, this.state.endDate)) {
      startDate = this.formattedDate(this.state.startDate);
      endDate = this.formattedDate(this.state.endDate);
    } else {
      startDate = '';
      endDate = ''
      alert('Start date and End date have not be added because end date can not be before start date')
    }

    let data = {
      itemCode: itemCode,
      description: this.state.description,
      price: this.state.price,
      creator: this.state.creator,
      suppliers: { id: this.state.supplier },
      priceReduction: {
        reducedPrice: this.state.reducedPrice,
        startDate: startDate,
        endDate: endDate
      }
    };

    axios.put(`http://localhost:8180/items/update`, data).then(res => {
      refresh();
    });
  };

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  startDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  endDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  render() {
    let Select = (
      <select name="supplier" onChange={this.inputHandler}>
        <option value="">---</option>
        {this.props.suppliers.map(supplier => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name + " - " + supplier.country}
          </option>
        ))}
      </select>
    );

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
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={this.inputHandler}
                  autoComplete="off"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  onChange={this.inputHandler}
                  step="0.01"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                {Select}
                <input
                  type="number"
                  name="priceReduction"
                  placeholder="Price reduction"
                  onChange={this.inputHandler}
                  step="0.01"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <div className="calendar">
                  <label>From:</label>
                  <DatePicker
                    locale="es"
                    selected={this.state.startDate}
                    onChange={this.startDateChange}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
                <div className="calendar">
                  <label>To:</label>
                  <DatePicker
                    locale="es"
                    selected={this.state.endDate}
                    onChange={this.endDateChange}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={e =>
                  this.formHandler(item.itemCode, this.props.refreshTable)
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}
