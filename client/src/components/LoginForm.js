import React, { Component } from "react";

export default class LoginForm extends Component {
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
          <h1 className="login__form--brand">Chat App</h1>
          <input
            className="login__form--username"
            type="text"
            placeholder="What's your username?"
            onChange={this.onChange}
            autoFocus
          />
          <button className="login__form--button" type="submit">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}
