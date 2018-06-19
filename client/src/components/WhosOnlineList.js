import React, { Component } from "react";

export default class WhosOnlineList extends Component {
  renderUsers() {
    return (
      <div className="online">
        <h1 className="online__header">Users</h1>
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
              <WhosOnlineListItem
                key={index}
                presenceState={user.presence.state}
              >
                {user.name}
              </WhosOnlineListItem>
            );
          })}
        </ul>
      </div>
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
    const presence = this.props.presenceState;
    return (
      <li className="onlinelist__item">
        <span className={presence === "online" ? "present" : "away"}>
          &#9679;
        </span>
        {this.props.children}
      </li>
    );
  }
}
