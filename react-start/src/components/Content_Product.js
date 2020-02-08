import React from "react";
import ToolBox from "components/ToolBox";
import Product from "components/Product";

class Content_Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <ToolBox
          search={this.props.search}
          insertSearch={this.props.insertSearch}
          clearSearch={this.props.clearSearch}
          cartCount={this.props.cartCount}
          isLogin={this.props.isLogin}
          isAdmin={this.props.isAdmin}
        />
        <Product
          products={this.props.products}
          addToCart={this.props.addToCart}
          openPanel={this.props.openPanel}
          isLogin={this.props.isLogin}
          isAdmin={this.props.isAdmin}
        />
      </div>
    );
  }
}

export default Content_Product;
