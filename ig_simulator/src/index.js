import React from "react";
import ReactDOM from "react-dom";
import "./css/index.scss";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.container=React.createRef();
    this.pressingPhoto=React.createRef();
  }

  handlePress = () => {
    this.pressTimer = setTimeout(() => {
      console.log("long press activated");
      this.container.current.classList.add('pressing');
      this.pressingPhoto.current.classList.remove('hide');
    }, 1500);
  };

  handleRelease = () => {
    clearTimeout(this.pressTimer);
    console.log("not pressing");
    this.container.current.classList.remove('pressing');
    this.pressingPhoto.current.classList.add('hide');
  };

  render() {
    return (
      <div className="container" ref={this.container}>
        <SearchPanel />
        <QuickButtons />
        <Photos pressStart={this.handlePress} pressEnd={this.handleRelease} />
        <PressingPhoto _ref={this.pressingPhoto}/>
        <Footer />
      </div>
    );
  }
}

function SearchPanel() {
  return (
    <div className="searchPanel">
      <i className="fa fa-search"></i>
      <input type="text" placeholder="搜尋"></input>
    </div>
  );
}

function QuickButtons() {
  const items = ["動物", "汽車", "電玩遊戲", "建築", "古蹟"];
  const buttons = items.map(b => {
    return <QuickButton name={b} icon={null} />;
  });
  return (
    <div className="quickButtons">
      <QuickButton name={"IGTV"} icon={<i className="fas fa-tv"></i>} />
      <QuickButton
        name={"商店"}
        icon={<i className="fas fa-shopping-bag"></i>}
      />
      {buttons}
    </div>
  );
}

function QuickButton(props) {
  return (
    <button className="quickButton">
      {props.icon && props.icon}
      {props.name}
    </button>
  );
}

function Photos(props) {
  let photos_dom = [];

  for (let i = 0; i < 240; i++) {
    photos_dom.push(
      <Photo
        key={i}
        rdn={i}
        pressStart={props.pressStart}
        pressEnd={props.pressEnd}
      />
    );
  }

  return (
    <div className="photos">
      {photos_dom}
    </div>
  );
}

function Photo(props) {
  const _src = `https://picsum.photos/200/300?random=${props.rdn}`;
  return (
    <div
      className="photo"
      onTouchStart={props.pressStart}
      onTouchEnd={props.pressEnd}
      onMouseUp={props.pressEnd}
      onMouseDown={props.pressStart}
    >
      <img src={_src}></img>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <i className="fas fa-home"></i>
      <i className="fa fa-search"></i>
      <i className="far fa-plus-square"></i>
      <i className="far fa-heart"></i>
      <i className="far fa-user"></i>
    </div>
  );
}

function PressingPhoto(props) {
  return <div ref={props._ref} className="pressingPhoto hide"></div>;
}

ReactDOM.render(<Index />, document.getElementById("root"));
