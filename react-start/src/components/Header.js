import React from "react";
import { Link ,withRouter} from "react-router-dom";
import "css/header.scss";
import _panel_userProfile from "components/UserProfile";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
    _panel_userProfile.redirect = () => {
      this.props.history.go(0);
    };
  }
  renderLink() {
    const nickName = this.props.nickName;

    if (nickName) {
      return (
        <React.Fragment>
          <span
            className="nickName"
            onClick={() => _panel_userProfile.openPanel()}
          >
            <i className="fas fa-user"></i>
            {this.props.nickName}
          </span>
          &nbsp;
          <Link to="/FunctionComponent_Cart">Cart</Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <a href="/Login">Login</a>
          <a href="/Register">Register</a>
          <Link to="/FunctionComponent_Cart">Cart</Link>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <div className="grid">
          <div className="start">
            <a href="/">Home</a>
          </div>
          <div className="end">{this.renderLink()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
