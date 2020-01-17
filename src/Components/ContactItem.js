import React, { Component } from "react";
import "./component.css";

class ContactItem extends Component {
  constructor() {
    super();

    this.onMarkItemComplete = event => {
      this.props.markItemComplete(this.props.id);
    };

    this.onDeleteItem = event => {
      this.props.deleteItem(this.props.id);
    };
  }
  render() {
    const itemClass =
      "isItemCompleted-" + (this.props.status ? "done" : "undone");

    return (
      <div className="container-fluid">
        <div className="item">
          <input type="checkbox" onChange={this.onMarkItemComplete} />
          <span className={itemClass} />
          <span>
            {" "}
            {this.props.firstName} {this.props.lastName} {this.props.email}{" "}
            {this.props.phone}
          </span>

          <button
            style={{ float: "right", marginTop: "-4px" }}
            type="button"
            className="btn btn-danger btn-sm"
            onClick={this.onDeleteItem}
          >
            x
          </button>
        </div>
      </div>
    );
  }
}

export default ContactItem;
