import React from "react";
import "css/components/opponent.scss";

class Opponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const oppos = this.props.opponents;
    return (
      <div className="opponent">
        <h2>請選擇你的對手</h2>
        <OpponentContainer
          oppos={oppos}
          chooseOpponent={this.props.chooseOpponent}
        />
      </div>
    );
  }
}

function OpponentContainer(props) {
  const dom_opponents = props.oppos.map(p => {
    return (
      <div
        className="opponent_item"
        key={p.id}
        onClick={event => {
          props.chooseOpponent(p.id, event);
        }}
      >
        <div className="img_container">
          <img className="opponent_img" src={p.img_url}></img>
        </div>

        <p className="opponent_name">{p.name}</p>
      </div>
    );
  });

  return <div className="opponent_container">{dom_opponents}</div>;
}

export default Opponent;
