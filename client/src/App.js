import React, { Component } from "react";

import UsernameForm from "./components/UsernameForm";
import ChatScreen from "./ChatScreen";

const REQUEST_USERS_URI =
  process.env.REACT_APP_REQUEST_USERS_URI || "http://localhost:5000/users";

class App extends Component {
  state = {
    currentUsername: "",
    currentScreen: "WhatIsYourUsernameScreen"
  };

  onUsernameSubmitted = username => {
    fetch(REQUEST_USERS_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: "ChatScreen"
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log(process.env);
    if (this.state.currentScreen === "WhatIsYourUsernameScreen") {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />;
    } else if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen currentUsername={this.state.currentUsername} />;
    }
  }
}

export default App;
