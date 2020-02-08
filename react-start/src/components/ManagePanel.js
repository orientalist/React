import React from "react";
import { render } from "react-dom";
import "css/components/managePanel.scss";
import axios from "commons/axios";

class ManagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.manage_panel = React.createRef();
    this.manage_panel_open = React.createRef();
    this.content_blocker = React.createRef();
    this.state = {
      is_new: false,
      is_show:true,
      form_data: {
        id: "",
        name: "",
        price: 0,
        tags: "",
        img_url: "",
        stock: 0,
        status: true,
        color_count: 0,
        time: "",
        inCart: false
      }
    };
  }

  closePanel = e => {
    e && e.preventDefault();
    this.manage_panel.current.classList.add("close");
    this.manage_panel_open.current.classList.remove("hide");
    this.content_blocker.current.classList.add("hide");
  };

  openPanel = (product = null) => {
    this.manage_panel.current.classList.remove("close");
    this.manage_panel_open.current.classList.add("hide");
    this.content_blocker.current.classList.remove("hide");

    if (product !== null) {
      this.setState({
        is_new: false,
        form_data: {
          id: product.id,
          name: product.name,
          price: product.price,
          tags: product.tags,
          img_url: product.img_url,
          stock: product.stock,
          status: product.status,
          color_count: product.color_count,
          time: product.time,
          inCart: product.inCart
        }
      });
    } else {
      this.setState({
        is_new: true,
        form_data: {
          id: "",
          name: "",
          price: 0,
          tags: "",
          img_url: "",
          stock: 0,
          status: true,
          color_count: 0,
          time: "",
          inCart: false
        }
      });
    }
  };

  handleChange = e => {
    let _data = this.state.form_data;
    let _value = e.target.value;
    if (e.target.id === "price" || e.target.id === "stock") {
      _value = parseInt(_value);
    }
    _data[e.target.id] = _value;
    this.setState({
      form_data: _data
    });
  };

  createProduct = e => {
    e.preventDefault();
    if (ValidateFormData(this.state.form_data)) {
      this.setState({ lastId: (this.state.lastId += 1) });
      let now_time = new Date();
      let data = {
        id: this.state.lastId.toString(),
        name: this.state.form_data.name,
        stock: parseInt(this.state.form_data.stock),
        color_count: 7,
        time: `${now_time.getFullYear()}/${now_time.getMonth()}/${now_time.getDate()}`,
        price: parseInt(this.state.form_data.price),
        inCart: false,
        img_url: this.state.form_data.img_url,
        status: this.state.form_data.status === "true",
        tags: this.state.form_data.tags
      };
      axios.post("products", data).then(response => {
        this.addProducts(response.data);
        this.closePanel(null);
      });
    }
  };

  updateProduct = e => {
    e.preventDefault();
    if (ValidateFormData(this.state.form_data)) {
      axios
        .put(`products/${this.state.form_data.id}`, this.state.form_data)
        .then(response => {
          this.refreshProduct(response.data);
        });
    }
  };

  deleteProduct = e => {
    e.preventDefault();
    if (
      window.confirm(
        `確定刪除 編號:${this.state.form_data.id} 名稱:${this.state.form_data.name} 商品?`
      )
    ) {
      let id = this.state.form_data.id;
      axios.delete(`products/${id}`).then(response => {
        this.closePanel();
        this.removeSingleProduct(id);
      });
    }
  };

  render() {
    let btn_group;
    if (this.state.is_new) {
      btn_group = (
        <button className="button is-dark" onClick={this.createProduct}>
          Submit
        </button>
      );
    } else {
      btn_group = (
        <React.Fragment>
          <button className="button is-warning" onClick={this.updateProduct}>
            Save
          </button>
          <button className="button is-danger" onClick={this.deleteProduct}>
            Delete
          </button>
        </React.Fragment>
      );
    }

    const open_btn_class=this.state.is_show?'manage_panel_open':'manage_panel_open hide';
    return (
      

      <React.Fragment>
        <div ref={this.content_blocker} className="content_blocker hide" onClick={this.closePanel}></div>
        <div
          className={open_btn_class}
          onClick={() => {
            this.openPanel(null);
          }}
          ref={this.manage_panel_open}
        >
          Manage Panel
        </div>
        <div className="manage_panel close" ref={this.manage_panel}>
          <a className="manage_panel_close" href="#" onClick={this.closePanel}>
            X
          </a>
          <form className="manage_panel_content">
            <h1>Inventory</h1>
            <label htmlFor="name" className="panel_label">
              Name
            </label>
            <input
              id="name"
              className="input"
              value={this.state.form_data.name}
              onChange={this.handleChange}
            ></input>
            <label htmlFor="price" className="panel_label">
              Price
            </label>
            <input
              className="input"
              type="number"
              id="price"
              value={this.state.form_data.price}
              onChange={this.handleChange}
            ></input>
            <label htmlFor="tags" className="panel_label">
              Tags
            </label>
            <input
              className="input"
              type="text"
              id="tags"
              value={this.state.form_data.tags}
              onChange={this.handleChange}
            ></input>
            <label htmlFor="img_url" className="panel_label">
              Images
            </label>
            <input
              className="input"
              type="text"
              id="img_url"
              value={this.state.form_data.img_url}
              onChange={this.handleChange}
            ></input>
            <label htmlFor="stock" className="panel_label">
              Stock
            </label>
            <input
              className="input"
              type="number"
              id="stock"
              value={this.state.form_data.stock}
              onChange={this.handleChange}
            ></input>
            <label htmlFor="status" className="panel_label">
              Status
            </label>
            <div className="select">
              <select
                id="status"
                value={this.state.form_data.status}
                onChange={this.handleChange}
              >
                <option value="true">上架</option>
                <option value="false">下架</option>
              </select>
            </div>
            <div className="btn_container">
              {btn_group}
              <button className="button" onClick={this.closePanel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function ValidateFormData(form_data) {
  let result = true;
  for (let prop in form_data) {
    if (typeof form_data[prop] === "string") {
      if (prop !== "tags" && prop !== "id" && prop !== "time") {
        if (form_data[prop].length <= 0) {
          alert(`${prop} 不可為空`);
          result = false;
        }
      }
    }
  }
  return result;
}

const _div = document.createElement("div");
document.body.append(_div);

const _panel = render(<ManagePanel />, _div);

export default _panel;
