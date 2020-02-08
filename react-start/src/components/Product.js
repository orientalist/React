import React from "react";
import "css/components/product.scss";
import "commons/helper";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Helper from "commons/helper";

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let _content;
    if (this.props.products.length > 0) {
      const dom_products = this.props.products.map(p => {
        return (
          <CSSTransition classNames="product-fade" timeout={300} key={p.id}>
            <ProductDom
              key={p.id}
              p={p}
              addToCart={this.props.addToCart}
              openPanel={this.props.openPanel}
              isLogin={this.props.isLogin}
              isAdmin={this.props.isAdmin}
            />
          </CSSTransition>
        );
      });
      _content = dom_products;
    } else {
      _content = (
        <CSSTransition classNames="product-fade" timeout={300} key={"1"}>
          <div>沒有商品</div>
        </CSSTransition>
      );
    }

    return (
      <div className="product">
        <TransitionGroup component={null}>{_content}</TransitionGroup>
      </div>
    );
  }
}

function ProductDom(prop) {
  let product = prop.p;

  return (
    <div className={`dom_product ${prop.isAdmin && "isAdmin"}`}>
      {prop.isLogin && prop.isAdmin && (
        <div>
          <div
            className="open_panel"
            onClick={() => {
              prop.openPanel(product);
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      <div className={`filter ${product.stock <= 0 ? "out_of_stock" : ""}`}>
        <span className="out_of_stock_text">Out of stock</span>
      </div>
      <img src={product.img_url}></img>
      <p className="color_count">{product.color_count} Colors</p>
      <p>Stock : {product.stock}</p>
      <p className="sale_date">{product.time}</p>
      <div className="price_container">
        <span className="price">{Helper.formatPrice(product.price)}</span>
        {prop.isLogin && !prop.isAdmin && (
          <a
            href="#"
            onClick={e => prop.addToCart(e, product.id)}
            className={product.stock <= 0 ? "outOfStock" : ""}
          >
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </a>
        )}
      </div>
    </div>
  );
}

export default Product;
