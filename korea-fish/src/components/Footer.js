import React from "react";
import "css/components/footer.scss";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer hide">
        <div className="slogan">
          <span>拉進來</span>
          <img
            className="logo"
            src="http://pngimg.com/uploads/car_wheel/car_wheel_PNG23314.png"
          />
          <span>打出去</span>
        </div>
        <div className="desc">
          <p>作者的話：這只是本人無聊做的。</p>
          <p>
            <a href="https://github.com/orientalist?tab=repositories" target='_blank'>Github</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
