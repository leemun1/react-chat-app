import React, { Component } from "react";

export default class MessageList extends Component {
  render() {
    return (
      <ul className="messagelist">
        {this.props.messages.map((message, index) => (
          <li key={index} className="messagelist__item">
            <span className="messagelist__item--sender">
              {message.senderId}
            </span>
            <span className="messagelist__item--message">{message.text}</span>
          </li>
        ))}
      </ul>
    );
  }
}
