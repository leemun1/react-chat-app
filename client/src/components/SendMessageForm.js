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
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="What's your message?"
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
