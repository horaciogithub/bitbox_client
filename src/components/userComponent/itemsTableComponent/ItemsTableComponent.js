function ItemsTable(props) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Item code</th>
            <th>Description</th>
            <th>
              <div className="state-container">
                <p> State</p>
                <button onClick={this.props.changeState} />
              </div>
            </th>
            <th>Price</th>
            <th>Creation date</th>
            <th>Creator</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="new-item">
            <td>
              <input
                type="number"
                id="itemCode"
                name="itemCode"
                onChange={this.props.inputHandler}
                min="0"
              />
            </td>
            <td>
              <input
                type="text"
                id="description"
                name="description"
                onChange={this.props.inputHandler}
              />
            </td>
            <td>
              <select name="state" onChange={this.props.inputHandler}>
                <option value="ACTIVE" defaultValue>
                  ACTIVE
                </option>
                <option value="DISCONTINUED">DISCONTINUED</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                id="price"
                name="price"
                onChange={this.props.inputHandler}
              />
            </td>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-primary" onClick={this.props.formHandler}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </td>
          </tr>
          {this.props.data.map(item => (
            <tr key={item.itemCode}>
              <td>{item.itemCode}</td>
              <td>{item.description}</td>
              <td className="state-edit">
                {item.state}
                {item.state === "ACTIVE" ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target={"#edit" + item.itemCode}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                ) : null}
              </td>
              <td>{item.price != null ? item.price + " €" : ""}</td>
              <td>{item.creationDate}</td>
              <td>{item.creator.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target={"#id" + item.itemCode}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>

                {item.state === "ACTIVE" ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-edit"
                    data-toggle="modal"
                    data-target={"#updte" + item.itemCode}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemsTable;