import React, { Component } from "react";
import Chatkit from "@pusher/chatkit";

import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import TypingIndicator from "./components/TypingIndicator";
import WhosOnlineList from "./components/WhosOnlineList";

const REQUEST_AUTH_URI =
  process.env.REACT_APP_REQUEST_AUTH_URI ||
  "http://localhost:5000/authenticate";

export default class ChatScreen extends Component {
  state = {
    messages: [],
    currentRoom: {},
    currentUser: {},
    usersWhoAreTyping: []
  };

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR,
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: REQUEST_AUTH_URI
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: 9386262,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error(error));
  }

  sendMessage = text => {
    this.state.currentUser.sendMessage({
      roomId: this.state.currentRoom.id,
      text
    });
  };

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  };

  render() {
    return (
      <div>
        <h1 styles={{ color: "red" }}>Chat</h1>
        <p>Hello, {this.props.currentUsername}</p>
        <WhosOnlineList
          currentUser={this.state.currentUser}
          users={this.state.currentRoom.users}
        />
        <MessageList messages={this.state.messages} />
        <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
        <SendMessageForm
          onSubmit={this.sendMessage}
          onChange={this.sendTypingEvent}
        />
      </div>
    );
  }
}
