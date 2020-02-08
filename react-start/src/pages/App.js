import React from "react";
import Content_Product from "components/Content_Product";
import _panel from "components/ManagePanel";
import axios from "commons/axios";
import { toast } from "react-toastify";
import auth from "commons/auth";

import Layout from "Layout";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      search: "",
      userId:''
    };
  }

  componentDidMount() {
    const isLogin=auth.getUser();
    const isAdmin=auth.getUser()&&auth.getUser().type===1;
    if (isLogin&&isAdmin) {
      _panel.setState({ is_show: true });
      _panel.addProducts = this.createProduct;
      _panel.refreshProduct = this.refreshProduct;
      _panel.removeSingleProduct = this.removeSingleProduct;
    } else {
      _panel.setState({ is_show: false });
    }

    let ins = this;
    axios.get("products").then(response => {
      this.setState({ products: response.data }, function() {
        let p = ins.state.products;
        _panel.setState({
          lastId: p.length > 0 ? parseInt(p[p.length - 1].id) : 0
        });
      });
    });
    let email='';
    if(auth.getUser()){
      email=auth.getUser().email;
    }

    axios.get(`cart?userId=${email}`).then(response => {
      this.setState({userId:email});
      this.setState({ cart: response.data });
    });
  }

  addToCart = (e, id) => {
    e.preventDefault();

    let ins = this;
    let product = ins.state.products.find(d => d.id === id);
    
    if (product.stock > 0) {
      product.stock -= 1;

      axios
        .put(`products/${id}`, product)
        .then(res => {
          return axios.get(`cart?userId=${ins.state.userId}&&product_id=${id}`);
        })
        .then(res => {
          const _data = res.data[0];
          
          if (_data) {
            _data.count += 1;
            return axios.put(`cart/${_data.id}`, _data);
          } else {
            const product_in_cart = { product_id: id, count: 1 ,userId:ins.state.userId};
            return axios.post("cart", product_in_cart);
          }
        })
        .then(res => {
          let _cart = ins.state.cart;

          let specific_cart = _cart.find(d => d.id === res.data.id);
          if (specific_cart) {
            specific_cart.count += 1;
          } else {
            _cart.push(res.data);
          }

          ins.setState({
            products: ins.state.products,
            cart: _cart
          });
          toast.success("成功加入購物車");
        });
    } else {
      alert("抱歉！該商品已售完！");
    }
  };

  insertSearch = e => {
    this.setState({ search: e.target.value });
  };

  clearSearch = e => {
    e.preventDefault();
    this.setState({ search: "" });
  };

  createProduct = product => {
    let _products = this.state.products;
    _products.push(product);
    this.setState({ products: _products });
    toast.success("商品新增成功");
  };

  refreshProduct = product => {
    let _products = this.state.products;
    _products[_products.findIndex(p => p.id === product.id)] = product;
    this.setState({ products: _products });
    toast.warn("修改成功");
  };

  removeSingleProduct = id => {
    let _products = this.state.products;
    _products.splice(
      _products.findIndex(p => p.id === id),
      1
    );
    this.setState({ products: _products });
    toast.success("刪除成功");
  };

  render() {
    let ins = this;
    let _product;
    if (ins.state.search.length > 0) {
      let _search = this.state.search.toLowerCase();
      _product = ins.state.products.filter(p => {
        return p.name.toLowerCase().includes(_search);
      });
    } else {
      _product = ins.state.products;
    }

    let product_count_in_cart = 0;

    if (this.state.cart.length > 0) {
      this.state.cart.map(c => {
        product_count_in_cart += c.count;
      });
    }

    return (
      <Layout>
        <Content_Product
          ref={this._product}
          search={this.state.search}
          products={_product}
          addToCart={this.addToCart}
          cartCount={product_count_in_cart}
          insertSearch={this.insertSearch}
          clearSearch={this.clearSearch}
          openPanel={_panel.openPanel}
          isLogin={auth.getUser() !== null}
          isAdmin={auth.getUser() !== null && auth.getUser().type === 1}
        />
      </Layout>
    );
  }
}

export default App;
