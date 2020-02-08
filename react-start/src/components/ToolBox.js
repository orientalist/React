import React from "react";
import { Link } from "react-router-dom";
import "css/components/toolbox.scss";

class ToolBox extends React.Component {
  constructor(props) {
    super(props);
    this.search_input = React.createRef();
  }

  render() {
    return (
      <div className={`toolbox ${this.props.isLogin&&'isLogin'}`}>
        <h1>
          <a href="#">STORE</a>
        </h1>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Search Product"
            ref={this.ref_search}
            onChange={this.props.insertSearch}
            value={this.props.search}
          ></input>
          <a
            href="#"
            className="cancel_search"
            onClick={this.props.clearSearch}
          >
            X
          </a>
        </div>
        {this.props.isLogin && (
          <Link to="/Cart">
            <div className="cart">
              <i className="fas fa-shopping-cart"></i>(&nbsp;
              <span>{this.props.cartCount}</span>&nbsp;)
            </div>
          </Link>
        )}
      </div>
    );
  }
}

export default ToolBox;
