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
      <div className="login">
        <form className="login__form" onSubmit={this.onSubmit}>
          <input
            className="login__form--username"
            type="text"
            placeholder="What's your username?"
            onChange={this.onChange}
            autoFocus
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}
