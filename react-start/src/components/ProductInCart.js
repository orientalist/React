import React from "react";
import "css/components/productInCart.scss";
import "commons/helper";
import Helper from "commons/helper";

class ProductInCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const doms = this.props.products_in_cart.map(p => {
      return (
        <ProductDom
          key={p.id}
          p={p}
          p_origin={this.props.products.find(po => po.id === p.product_id)}
          addToCart={this.props.addToCart}
        />
      );
    });

    let total_price=0;

    this.props.products_in_cart.forEach(p=>{
        total_price+=p.count * (this.props.products.find(po=>po.id===p.product_id).price);
    });

    total_price=Helper.formatPrice(total_price).toString().replace(/\.+\d+/g,'');

    return (
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

          <tbody>{doms}</tbody>
          <tfoot>
              <tr>
                  <td className='summary' colSpan='6'>
                      <span>總價：{total_price}</span>
                  </td>
              </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

function ProductDom(props) {
  const p = props.p;
  const p_origin = props.p_origin;

  return (
    <tr className="dom_product_in_cart">
      <td className="index">{p.id}</td>
      <td className="product_img">
        <img src={p_origin.img_url}></img>
      </td>
      <td>{p_origin.name}</td>
      <td>{Helper.formatPrice(p_origin.price).toString().replace(/\.+\d+/g,'')}</td>
      <td>
          <input className='product_count' type='number' value={p.count} min='0' onChange={(event)=>{props.addToCart(p.id,event.target.value,p_origin.id)}}></input>
      </td>
      <td>{Helper.formatPrice(parseInt(p_origin.price * p.count)).toString().replace(/\.+\d+/g,'')}</td>
    </tr>
  );
}

export default ProductInCart;
