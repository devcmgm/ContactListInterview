import React, { Component } from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import "./App.css";
import ContactList from "./Components/ContactList";
import MessageRequired from "./Components/MessageRequired"

class App extends Component {

  routing = (
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/addContact" component={App} />
        <Route path="/deleteContact" component={App} />
      </div>
    </Router>
  )

  constructor() {
    super();

    this.state = {
      showmsg: false,
      fname: "",
      lname: "",
      email: "",
      phone: "",
      items: []
    };

    this.handleFnameInput = event => {
      this.setState({
        fname: event.target.value
      });
    };

    this.handleLnameInput = event => {
      this.setState({
        lname: event.target.value
      });
    };

    this.handlePhoneInput = event => {
      this.setState({
        phone: event.target.value
      });
    };

    this.handleEmailInput = event => {
      this.setState({
        email: event.target.value
      });
    };

    this.handleAddItem = event => {
      event.preventDefault();

      if (this.state.fname === "" ||
      this.state.lname === "" ||
      this.state.email === "" ||
      this.state.phone === "" ) { 
         return
      } else {

      const newItem = {
        item: {
          id: Date.now(),
          fname: this.state.fname,
          lname: this.state.lname,
          email: this.state.email,
          phone: this.state.phone,
          status: false
        }
      };

    fetch("/addContact")
    .then(res => (res.ok ? res : Promise.reject(res)))
    //.then(res => res.json())

      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
        fname: "",
        lname: "",
        email: "",
        phone: ""
      }));
    }
    };

    this.handleMarkItemComplete = itemId => {
      const updatedItems = this.state.items.map(item => {
        if (itemId === item.id) item.status = !item.status;

        return item;
      });

      this.setState({
        items: [].concat(updatedItems)
      });
    };

    this.handleDeleteItem = itemId => {
      const updatedItems = this.state.items.filter(item => {
        return item.id !== itemId;
      });

      this.setState({
        items: [].concat(updatedItems)
      });
    };
  }

  render(routing) {
    const btn_style = {
      marginLeft: "10px",
      marginBottom: "5px"
    };

    const input_style = {
      width: "250px",
      padding: "5px"
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            <div className="body">
              <h2 className="heading">Contact List</h2>
              <input
                style={input_style}
                placeHolder="First Name"
                type="input"
                onChange={this.handleFnameInput}
                value={this.state.fname}
              />
              <input
                style={input_style}
                placeHolder="Last Name"
                type="input"
                onChange={this.handleLnameInput}
                value={this.state.lname}
              />
              <input
                style={input_style}
                placeHolder="Last Name"
                type="input"
                onChange={this.handleEmailInput}
                value={this.state.email}
              />
              <input
                style={input_style}
                placeHolder="Last Name"
                type="input"
                onChange={this.handlePhoneInput}
                value={this.state.phone}
              />
              <button
                style={btn_style}
                type="button"
                className="btn btn-primary btn-md"
                onClick={this.handleAddItem}
              >
                Add
              </button>
              <ContactList
                items={this.state.items}
                deleteItem={this.handleDeleteItem}
                markItemComplete={this.handleMarkItemComplete}
              />
            </div>
            <MessageRequired style={this.state.showmsg ? {} : { display: 'none' }} />
       
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

export default App;
