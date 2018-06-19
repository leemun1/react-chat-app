import React, { Component } from "react";

export default class SendMessageForm extends Component {
  state = {
    text: ""
  };

  onChange = event => {
    this.setState({ text: event.target.value });
    this.props.onChange();
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.text);
  };

  render() {
    return (
      <div className="sendmessage">
        <form onSubmit={this.onSubmit} className="sendmessage__form">
          <input
            className="sendmessage__form--message"
            type="text"
            placeholder="What's your message?"
            onChange={this.onChange}
          />
          <button className="sendmessage__form--button" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}
