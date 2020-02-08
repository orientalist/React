import React from "react";
import Content_Cart from "components/Content_Cart";
import ManagePanel from "components/ManagePanel";
import Layout from "Layout";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ManagePanel.setState({ is_show: false });
  }

  render() {
    return (
      <Layout>
        <Content_Cart />
      </Layout>
    );
  }
}

export default Cart;
