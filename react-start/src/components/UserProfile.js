import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import "css/components/userProfile.scss";
import auth from "commons/auth";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  let type = "";

  useEffect(() => {
    setUser(global.auth.getUser());
    if (user) {
      switch (user.type) {
        case 1:
          type = "admin";
          break;
      }
    }
  }, [JSON.stringify(user)]);

  const blocker = useRef(null);
  const panel = useRef(null);

  const closePanel = () => {
    blocker.current.classList.add("hide");
    panel.current.classList.add("close");
  };

  const openPanel = () => {
    blocker.current.classList.remove("hide");
    panel.current.classList.remove("close");
  };

  return (
    <React.Fragment>
      <div
        ref={blocker}
        className="userProdile_blocker hide"
        onClick={closePanel}
      ></div>
      <div className="userProdile_panel close" ref={panel}>
        <a className="manage_panel_close" href="#" onClick={closePanel}>
          X
        </a>
        {user && (
          <form className="manage_panel_content">
            <h1>User Profile</h1>
            <label htmlFor="nickName" className="panel_label">
              Nick Name:
            </label>
            <input
              id="nickName"
              className="input"
              value={user.nickName}
            ></input>
            <label htmlFor="email" className="panel_label">
              Account:
            </label>
            <input
              id="account"
              type="email"
              className="input"
              value={user.email}
            ></input>
            <label htmlFor="type" className="panel_label">
              Type:
            </label>
            <input id="type" type="text" className="input" value={type}></input>
            <div className="btn_container">
              <button className="button">Logout</button>
              <button className="button">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

class _UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.blocker = React.createRef();
    this.panel = React.createRef();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.setState({ user: auth.getUser() });
  }

  closePanel = () => {
    this.blocker.current.classList.add("hide");
    this.panel.current.classList.add("close");
  };

  openPanel = () => {
    this.blocker.current.classList.remove("hide");
    this.panel.current.classList.remove("close");
  };

  refresh = () => {
    console.log(auth.getUser());
    this.setState({ user: auth.getUser() });
  };

  render() {
    let type = "";
    if (this.state.user) {
      switch (this.state.user.type) {
        case 1:
          type = "admin";
          break;
        default:
          type = "General User";
          break;
      }
    }
    return (
      <React.Fragment>
        <div
          ref={this.blocker}
          className="userProdile_blocker hide"
          onClick={this.closePanel}
        ></div>
        <div className="userProdile_panel close" ref={this.panel}>
          <a className="manage_panel_close" href="#" onClick={this.closePanel}>
            X
          </a>
          {this.state.user && (
            <form className="manage_panel_content">
              <h1>User Profile</h1>
              <label htmlFor="nickName" className="panel_label">
                Nick Name:
              </label>
              <input
                id="nickName"
                className="input"
                value={this.state.user.nickName}
                disabled
              ></input>
              <label htmlFor="email" className="panel_label">
                Account:
              </label>
              <input
                id="account"
                type="email"
                className="input"
                value={this.state.user.email}
                disabled
              ></input>
              <label htmlFor="type" className="panel_label">
                Type:
              </label>
              <input
                id="type"
                type="text"
                className="input"
                defaultValue={type}
                disabled
              ></input>
              <div className="btn_container">
                <button
                  className="button"
                  onClick={event => {
                    event.preventDefault();
                    auth.logOut();
                    this.redirect();
                  }}
                >
                  Logout
                </button>
                <button
                  className="button"
                  onClick={event => {
                    event.preventDefault();
                    this.closePanel();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const _div = document.createElement("div");
document.body.append(_div);

const _panel_userProfile = render(<_UserProfile />, _div);

export default _panel_userProfile;
