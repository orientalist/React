import React from "react";
import axios from "commons/axios";
import ProductInCart from "components/ProductInCart";
import "css/components/cart.scss";
import { toast } from "react-toastify";
import auth from 'commons/auth';

class Content_Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_in_cart: [],
      products: []
    };
  }

  componentDidMount() {
    const user=auth.getUser();
    let email='';
    if(user){
      email=user.email;
    }

    let data = { product_in_cart: [], products: [] };
    axios
      .get(`cart?userId=${email}`)
      .then(resp => {
        if (resp.data.length > 0) {
          let query_string = "";
          data.product_in_cart = resp.data;
          resp.data.map(d => {
            query_string += `&id=${d.product_id}`;
          });
          query_string = query_string.slice(1, query_string.length);
          return axios.get(`products?${query_string}`);
        }
      })
      .then(resp => {
        if (resp) {
          data.products = resp.data;
        }
        this.setState({
          product_in_cart: data.product_in_cart,
          products: data.products
        });
      });
  }

  addToCart = async (id, count, p_id) => {
    count = count ? (count = parseInt(count)) : 0;

    const index = this.state.product_in_cart.findIndex(p => p.id === id);

    const before_count = this.state.product_in_cart[index].count;

    let is_continue = true;

    if (count > before_count) {
      await axios.get(`products/${p_id}`).then(resp => {
        if (resp.data) {
          if (resp.data.stock < count - before_count) {
            count = before_count;
            toast.warn("不可超過庫存餘數");
            is_continue = false;
          }
        }
      });
    }

    if (is_continue) {
      const change_count = before_count - count;

      this.state.product_in_cart[index].count = count;

      axios
        .put(`cart/${id}`, this.state.product_in_cart[index])
        .then(resp => {
          this.setState({ product_in_cart: this.state.product_in_cart });
          return axios.get(`products?id=${resp.data.product_id}`);
        })
        .then(resp => {
          if (resp.data.length > 0) {
            let p = resp.data[0];
            p.stock += change_count;

            axios.put(`products/${p.id}`, p);
          }
          toast.success("修改成功");
        });

      if (count === 0) {
        axios.delete(`cart/${id}`).then(resp => {
          this.state.product_in_cart = this.state.product_in_cart.filter(
            p => p.id !== id
          );
          this.setState({ product_in_cart: this.state.product_in_cart });
        });
      }
    }
  };

  deleteProduct(id) {
    console.log(id);
  }

  render() {
    const product_in_cart = this.state.product_in_cart;
    const products = this.state.products;

    return (
      <div className="content">
        <div className="header_cart">
          <h1>
            <a href="#">Cart</a>
          </h1>
        </div>
        <ProductInCart
          products_in_cart={product_in_cart}
          products={products}
          addToCart={this.addToCart}
          deleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}

export default Content_Cart;
