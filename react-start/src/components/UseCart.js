import { useState, useEffect } from "react";
import { cartHook, productHook } from "../commons/axios";

function UseCart() {
  const [cart, setCart] = useState([]);
  //console.log("cart using");

  useEffect(() => {
    function handleCartChange(_cart) {
      //console.log("cart back");
      setCart(_cart);
    }

    //console.log("cart effect");
    cartHook.subscribe(handleCartChange);

    return function clearAPI() {
      //console.log("cart clear");
      cartHook.unSubscribe();
    };
  }, [cart]);

  return cart;
}

function UseProduct(productInCart) {
  const [products, setProducts] = useState([]);
  //console.log('p use');

  useEffect(() => {
    function handleProductsChange(_products) {
        //console.log('p back');
      setProducts(_products);
    }

    //console.log('p effect');

    if (productInCart.length > 0) {
        //console.log('p call');
      let queryString = "";
      productInCart.map(p => {
        queryString += `&id=${p.product_id}`;
      });
      queryString = queryString.slice(1, queryString.length);
      productHook.subscribe(queryString, handleProductsChange);
    }

    return function clearAPI() {
        //console.log('p clear');
      productHook.unSubscribe();
    };
  }, [productInCart]);

  return products;
}

export { UseCart, UseProduct };
