import React, { useState, useEffect, useMemo } from "react";
import Layout from "../Layout";
import axios from "../commons/axios";
import Helper from "commons/helper";
import "../css/components/functionComponent_Cart.scss";
import { toast, cssTransition } from "react-toastify";

function FunctionComponent_Cart() {
  let dom = null;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("cart").then(resp => {
      setCart(resp.data);
    });
  }, [JSON.stringify(cart)]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cart.length > 0) {
      let queryString = "";
      cart.map(c => {
        queryString += `&id=${c.product_id}`;
      });
      queryString = queryString.slice(1, queryString.length);
      axios.get(`products?${queryString}`).then(resp => {
        setProducts(resp.data);
      });
    }
  }, [JSON.stringify(cart)]);

  let total_price = 0;

  const refreshCart = function(_cart) {
    let newCart = [...cart];
    let index = newCart.findIndex(c => c.id === _cart.id);
    newCart.splice(index, 1, _cart);
    setCart(newCart);
  };

  const refreshProduct = function(_product) {
    let newProduct = [...products];
    let index = newProduct.findIndex(p => p.id === _product.id);
    newProduct.splice(index, 1, _product);
    setProducts(newProduct);
  };

  const handleChange = (e, cid, pid) => {
    let _count = e.target.value ? parseInt(e.target.value) : 0;

    let _cart = cart.find(d => d.id === cid);

    let before_count = _cart.count;

    let _product = products.find(p => p.id === pid);

    let left_count = _product.stock;

    let is_continue = true;

    if (_count > before_count) {
      if (left_count < _count - before_count) {
        _count = before_count;
        toast.warn("剩餘庫存不足");
        is_continue = false;
      }
    }

    if (is_continue) {
      const change_count = before_count - _count;

      axios
        .put(`cart/${cid}`, { ..._cart, count: _count })
        .then(resp => {
          refreshCart(resp.data);
          return axios.get(`products?id=${resp.data.product_id}`);
        })
        .then(resp => {
          if (resp.data.length > 0) {
            let p = resp.data[0];
            p.stock += change_count;

            return axios.put(`products/${p.id}`, p);
          }
          toast.success("修改成功");
        })
        .then(resp => {
          refreshProduct(resp.data);
        });
    }
  };

  if (cart.length > 0 && products.length > 0) {
    dom = cart.map(c => {
      let p = products.find(p => p.id === c.product_id);

      total_price += c.count * p.price;

      return (
        <Product
          key={c.id}
          cart={c}
          product={products.find(p => p.id === c.product_id)}
          handleChange={handleChange}
        />
      );
    });
  }

  total_price = Helper.formatPrice(total_price)
    .toString()
    .replace(/\.+\d+/g, "");

  return (
    <Layout>
      <div className="productInCart">
        <table>
          <thead>
            <tr>
              <th>編號</th>
              <th>圖片</th>
              <th>名稱</th>
              <th>價格</th>
              <th>數量</th>
              <th>小記</th>
            </tr>
          </thead>
          <tbody>{dom}</tbody>
          <tfoot>
            <tr>
              <td className="summary" colSpan="6">
                <span>總價：{total_price}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Layout>
  );
}

function Product(props) {
  let c = props.cart;
  let p = props.product;

  const totalPrice=useMemo(()=>{
    return Helper.formatPrice(parseInt(p.price * c.count))
    .toString()
    .replace(/\.+\d+/g, "")
  },[c]);

  return (
    <tr className="dom_product_in_cart">
      <td className="index">{c.id}</td>
      <td className="product_img">
        <img src={p.img_url}></img>
      </td>
      <td>{p.name}</td>
      <td>
        {Helper.formatPrice(p.price)
          .toString()
          .replace(/\.+\d+/g, "")}
      </td>
      <td>
        <input
          className="product_count"
          type="number"
          value={c.count}
          min="0"
          onChange={event => {
            props.handleChange(event, c.id, p.id);
          }}
        ></input>
      </td>
      <td>
        {totalPrice}
      </td>
    </tr>
  );
}

export default FunctionComponent_Cart;
