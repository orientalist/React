import React from "react";
import Opponent from "components/Opponent";
import Politics from 'components/Polotics';
import Footer from 'components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opponents: [
        {
          id: "1",
          name: "English Vegetable",
          img_url:
            "https://live.staticflickr.com/3815/10595642515_0c727a3915_b.jpg"
        },
        {
          id: "2",
          name: "True Fish",
          img_url:
            "https://live.staticflickr.com/2284/2260768554_38081a8aef_z.jpg"
        }
      ],
      choosen: ""
    };
  }

  chooseOpponent = (val,e) => {
    this.setState({ choosen: val });
  
    document.querySelectorAll('.opponent_img').forEach(o=>{
        o.classList.remove('choosen');
    });  
    e.target.classList.add('choosen')

    document.querySelector('.politics').classList.add('show');

    setTimeout(()=>{
        //window.scrollTo(0,document.body.scrollHeight);
    },200);
  };

  render() {
    return (
      <div className="content">
        <h1>Korea Fish 政見發表模擬器</h1>
        <Opponent
          opponents={this.state.opponents}
          chooseOpponent={this.chooseOpponent}
        />
        <Politics />
        <Footer />
      </div>
    );
  }
}

export default App;
