import React from "react";
import ContactItem from "./ContactItem";
import "./component.css";

class ContactList extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <ContactItem
            id={item.id}
            status={item.status}
            firstName={item.item.fname}
            lastName={item.item.lname}
            email={item.item.email}
            phone={item.item.phone}
            deleteItem={this.props.deleteItem}
            markItemComplete={this.props.markItemComplete}
          />
        ))}
      </div>
    );
  }
}

export default ContactList;
