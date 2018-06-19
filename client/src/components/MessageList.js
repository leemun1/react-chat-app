import React, { Component } from "react";

export default class MessageList extends Component {
  render() {
    return (
      <ul>
        {this.props.messages.map((message, index) => (
          <li key={index}>
            <div>
              <span>{message.senderId}</span>
              <span>{message.text}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
