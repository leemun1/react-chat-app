import React, { Component } from "react";

export default class WhosOnlineList extends Component {
  renderUsers() {
    return (
      <ul className="onlinelist">
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhosOnlineListItem key={index} presenceState="online">
                {user.name} (You)
              </WhosOnlineListItem>
            );
          }
          return (
            <WhosOnlineListItem key={index} presenceState={user.presence.state}>
              {user.name}
            </WhosOnlineListItem>
          );
        })}
      </ul>
    );
  }
  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return <p className="onlinelist--loading">Loading...</p>;
    }
  }
}

class WhosOnlineListItem extends Component {
  render() {
    return <li className="onlinelist__item">{this.props.children}</li>;
  }
}
