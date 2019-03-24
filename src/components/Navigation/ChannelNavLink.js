import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class ChannelNavLink extends Component {
  render() {
    const { channel } = this.props;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink
          className="nav-link"
          activeClassName="selected"
          to={`/channels/${channel.id}`}
        >
          {channel.image_url ? (
            <img
              className="navImage"
              src={channel.image_url}
              height="42"
              width="42"
              alt="Avatar"
            />
          ) : (
            <img
              className="navImage"
              src="https://secure.gravatar.com/avatar/481e873a74c92b0b4cf0153bc30162d6?d=https://forum.kaspersky.com/uploads/monthly_2017_08/C.png.2fc5795e4b9c239cb0564bbf3330a765.png"
              height="42"
              width="42"
              alt="Avatar"
            />
          )}
          <span className="nav-link-text"> {channel.name}</span>
        </NavLink>
      </li>
    );
  }
}

export default ChannelNavLink;
