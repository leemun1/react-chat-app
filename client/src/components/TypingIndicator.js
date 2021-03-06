import React, { Component } from "react";

export default class TypingIndicator extends Component {
  render() {
    const typingUsers = this.props.usersWhoAreTyping;
    if (typingUsers.length === 0) {
      return null;
    } else if (typingUsers.length === 1) {
      return <p className="typing-indicator">{typingUsers[0]} is typing...</p>;
    } else if (typingUsers.length > 1) {
      return (
        <p className="typing-indicator">
          {typingUsers.join(" and ")} are typing...
        </p>
      );
    }
  }
}
