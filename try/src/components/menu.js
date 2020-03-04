import React from "react";
import "../scss/menu.scss";


const Menu = props => { 
  return (
    <div className="menu">
      <ul>
          {
              props.data.map((d,i)=>{
                  return d.has_child?
                  (<ItemWithChild key={i} item={d} is_root={true} />):
                  (<ItemNoChild key={i} item={d} is_root={true} />);
              })
          }
      </ul>
    </div>
  );
};

const ItemWithChild = props => {
  return (
    <React.Fragment>
      <li
        className={`title ${props.is_root ? "title_root" : "title_child"}`}
        onClick={e => {
          showChildren(e);
        }}
      >
        {props.item.name}
      </li>
      <ul>
        {props.item.children.map((c, i) =>
          c.has_child ? (
            <ItemWithChild key={i} item={c} is_root={false} />
          ) : (
            <ItemNoChild key={i} item={c} is_root={false} />
          )
        )}
      </ul>
    </React.Fragment>
  );
};

const ItemNoChild = props => {
  return (
    <li className={props.is_root ? "title_root" : "title_child"}>
      <a href={props.item.url} target="_blank">
        {props.item.name}
      </a>
    </li>
  );
};

const showChildren = e => {
  const titles = document.getElementsByClassName("title");
  for (let i = 0; i < titles.length; i++) {
    titles[i].classList.remove("show");
  }

  const title = e.currentTarget;

  let nodes = [];

  getNodeTree(title, nodes);

  nodes.forEach(n => {
    n.classList.add("show");
  });
};

const getNodeTree = (node, result) => {
  result.push(node);

  if (!node.classList.contains("title_root")) {
    const next_node = node.closest("ul").previousSibling;
    getNodeTree(next_node, result);
  } else {
    return result;
  }
};

export default Menu;
