import React, { Component } from "react";

export default class UsernameForm extends Component {
  state = {
    username: ""
  };

  onChange = event => {
    this.setState({ username: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="What's your username?"
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
