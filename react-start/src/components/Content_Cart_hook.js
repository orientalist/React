import React from 'react';
import { UseCart, UseProduct } from "./UseCart";
import "css/components/cart.scss";
import { toast } from "react-toastify";


function Content_Cart_hook() {
  let carts = UseCart();

  let products = UseProduct(carts);

  let doms = null;
  if (carts.length > 0 && products.length > 0) {
    doms = carts.map(d => {
      return <div key={d.id}>{d.product_id}</div>;
    });
  }

  return doms;
}

export default Content_Cart_hook;
