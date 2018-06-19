import React, { Component } from "react";
import Chatkit from "@pusher/chatkit";

import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import TypingIndicator from "./components/TypingIndicator";
import WhosOnlineList from "./components/WhosOnlineList";

const REQUEST_AUTH_URI =
  process.env.REACT_APP_REQUEST_AUTH_URI ||
  "http://localhost:5000/authenticate";

const CHATKIT_INSTANCE_LOCATOR = "v1:us1:095584a2-4cb6-4896-9280-d6522e45cd4d";

function scrollToBottom() {
  let messages = document.querySelector(".messagelist");
  let scrollHeight = messages.scrollHeight;
  messages.scrollTo(0, scrollHeight);
}

export default class ChatScreen extends Component {
  state = {
    messages: [],
    currentRoom: {},
    currentUser: {},
    usersWhoAreTyping: []
  };

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
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
              this.setState(
                {
                  messages: [...this.state.messages, message]
                },
                () => {
                  scrollToBottom();
                }
              );
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
    this.state.currentUser
      .sendMessage({
        roomId: this.state.currentRoom.id,
        text
      })
      .then(() => {
        console.log("scrolling!");
        scrollToBottom();
      });
  };

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({
        roomId: this.state.currentRoom.id
      })
      .catch(error => console.error("error", error));
  };

  render() {
    return (
      <div className="chat">
        <div className="sidebar">
          <div className="sidebar__brand">
            <img src="/img/plane.png" alt="plane" />
            <span>Paperplane</span>
          </div>
          <h1 className="sidebar__greeting">
            Hello, {this.props.currentUsername}
          </h1>
          <WhosOnlineList
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
          />
        </div>
        <div className="messages">
          <MessageList messages={this.state.messages} />
          <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
          <SendMessageForm
            onSubmit={this.sendMessage}
            onChange={this.sendTypingEvent}
          />
        </div>
      </div>
    );
  }
}
