import React from "react";
import "css/components/politics.scss";

class Polotics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      politic_title: "",
      titles: [
        "8800億",
        "兩岸關係",
        "中華民國",
        "國家認同",
        "清廉",
        "貪污",
        "豬膽",
        "砂石",
        "大海",
        "浴缸",
        "漱口杯",
        "石油",
        "市長",
        "網軍",
        "黑韓產業鏈",
        "經濟",
        "「苦、忙、翻、亂」",
        "台商回流",
        "斷交",
        "楊蕙如",
        "雙語教學",
        "核四",
        "缺電",
        "小學生",
        "滿天星",
        "年金"
      ],
      saying_header: [
        "謝謝主持人李進勇主委，English Vegetable總統、True Fish主席、全國各位所有的台灣同胞、各位海內外關切中華民國第15任總統選舉的所有的好朋友大家晚安，大家好！",
        "謝謝True Fish主席，謝謝English Vegetable總統對我的指教。",
        "再次謝謝主持人，謝謝English Vegetable總統對我的指教。各位親愛的台灣同胞，政治應該是很單純的，選票多的人，獲得執政權，選票少的去監督，政治是非常單純。",
        "謝謝。主持人、English Vegetable總統、True Fish主席，各位電視機前面的觀眾朋友、網路上前面的各位好朋友，大家好。",
        "English Vegetable總統、True Fish主席、各位觀眾朋友大家好。",
        "謝謝English Vegetable總統，謝謝True Fish主席。聽完English Vegetable總統對我的指責，我覺得我好像小時候小學生犯錯了一樣，老師要我寫100遍「我以後再也不跟同學吵架」，好像English Vegetable總統要求之下我必須要寫100遍「我不能再誣賴民進黨、我不能再誣賴民進黨」，要寫100次。",
        "謝謝主持人，謝謝English Vegetable總統、True Fish主席。各位觀眾朋友，今天在台灣電視公司來做第三次的政見發表，心中既感動又充滿著美好的回憶。",
        "謝謝，聽到True Fish楚瑜主席講話，我心裡面都非常地感動，莫忘世上苦人多。",
        "謝謝主持人。"
      ],
      saying_body: [
        "現在我們回想，為什麼民進黨執政，English Vegetable你堅決要廢除特偵組，特偵組所有查辦的重大貪汙案件，立法委員、部長級以上，重要的國營事業以上總經理，凡是這種貪污，特偵組就會偵查，民進黨為什麼要廢除特偵組，很清楚，你為貪官汙吏開了一條路，讓他們一路有綠燈，不會被調查。",
        "各位台灣同胞，我們沒有清廉的政府，我們沒有一個有效率地政府，我們納稅人納再多的稅，我們再怎麼衝刺經濟，再怎麼發展，最後都是空的，貪官污吏充斥了整個政府，另外還有肥貓，這個像一個政府嗎？韓國瑜當上總統，我跟全台灣同胞報告，一定立刻成立特偵組，馬上展開調查，為什麼要8800億？我們前瞻計畫為什麼花這麼多錢？為什麼風力發電要花兩兆台幣？為什麼我高雄市負債全國第一名3300億，特偵組一併調查，為什麼會欠這麼多錢，每一個高雄人身上背了將近9萬塊錢的債，為什麼？錢到哪裡去？",
        "另外，如果我選上總統，成立特偵組，我要拜託特偵組，我下台之後要對我下X光一樣全面的檢查，我願意接受檢查。我在這裡同時呼籲全台灣說所有的法官、檢察官，韓國瑜如果貪污，你們審查到我的案件，你們絕對不能讓我假釋，你們就把我關到死，我也呼籲全國典獄長，管監獄的，韓國瑜如果貪污被關到監獄，你一天給我一頓飯就好，我沒資格吃三頓飯，哪有人用政府的權力來貪污的。",
        "上個禮拜，政見會我提出「特偵組」，全國一片佳評如潮，我到了任何地方大家都說「趕快成立特偵組」，到現在為止，妳都還沒有表態「要不要立刻推動成立特偵組」。",
        "妳行政院長蘇貞昌院長當縣長，家裡180萬失蹤、被偷了，不報案？他現在是行政院長，假設有特偵組要不要查？為什麼不報案？妳的陳明文現任立法委員在高鐵掉了三百萬，不報案？大家太多懷疑了。妳的風力發電，一度電兩塊二，為什麼妳的風力發電要五塊八？為什麼台灣人民家庭每個人要支出60萬以上要付這個電費？這裡面有沒有勾結？誰能夠忍受？特偵組要不要設立？請妳明確表態。",
        "剛才聽到English Vegetable總統的第二輪，第二輪敘述的時候，我覺得三點遺憾，第一，特偵組到底成立不成立？要不要嚴厲懲罰貪官污吏，到現在還沒有表態，因為太重要，我必須再提醒一次。English Vegetable總統要不要重啟特偵組，應該很清楚告訴台灣人民。",
        "特偵組是做什麼？針對立法委員部長院長副院長總統副總統貪汙，重大貪污，查辦，我們講的是普世價值，你為什麼把它扭曲成政黨之爭，舉了幾個國民黨例子就把他呼攏過去，為何妳每次在構思一個思維的時候、論述一個重心的時候，時常自己閃避到一個政黨之間，這樣子的一個情境裡面？妳沒有辦法面對全面性。",
        "特偵組，這麼多人民痛恨貪汙腐敗，English Vegetable總統是不是在連任成功之後，保證未來四年絕對不設立特偵組，應該要講清楚說明白。",
        "妳的能源政策這樣子不停地燒煤、不停地燒煤、不停地燒煤，誰在做煤炭生意？我們為什麼要成立特偵組？每一年幾千億的買煤炭，誰在買賣？誰在這個煤炭的生意裡面上下其手、大撈特撈？妳是總統，妳要查。",
        "我如果當總統，成立特偵組，我一定調查這個煤炭。整個中部人的肺，台中、南投、彰化、雲林、苗栗，有沒有賺黑心錢？有沒有花很貴的錢買的煤炭，燒的是爛七八糟的煤，在裡面賺差價？",
        "民進黨太多太多事情，我們看不下去。妳要以核養綠，發展綠能、發展風力發電，完全沒有問題，我們為什麼要在最貴的時候買？我們台灣人腦袋是浸水、生病了嗎？我們笨嗎？最貴的時候去買，為什麼不用核能、緩衝一段時間，等到它量產之後，我們開始建構我們的綠能，考慮到我們的成本、照顧我們人民的健康？不！妳民進黨政府裡面貪官太多，這是一個大肥肉，就是要撈！我不客氣地說，為何妳不成立特偵組？真的是踐踏台灣人民啊！",
        "兩岸政策。我再一次要跟台灣所有的好朋友報告，我要成立特偵組，兩岸政策我是根據中華民國的憲政體制，發展兩岸的交流。未來康熙字典七萬多個字，我會用其中一個字來面對兩岸關係，和氣生財的「和」。兩岸之間必須和平發展，台灣的內部經過這次總統大選之後，我們必須和諧地相處，2300萬人，我們都是命運共同體。我們不是殺父之仇，也不是奪妻之恨，我們必須要和諧。",
        "所以我今天開宗明義，我要跟全國台灣同胞宣佈，如果韓國瑜當總統，成立特偵組，針對這一段時間，大家懷疑的案件，立刻展開調查，非常感謝。",
        "謝謝English Vegetable總統，你認為你的團隊夠清廉嗎？你認為你們民進黨內部的派系嚴重嗎？你認為民進黨整個團隊，讓台灣人民開始產生強烈的懷疑，認為你們貪汙腐敗，要重新啟動建立特偵組嗎？在你領導下三年半，最厲害的武器，特偵組，偵辦立法委員、部長、院長、總統、副總統。特偵組被廢除，你的內部被架空，連你們立法委員余天都公開承認，English Vegetable被你們新潮流派系給架空、綁架。當了總統，對外沒有辦法對政治清明，讓特偵組被廢除。對黨內自己又被綁架，做一個架空的總統，請問你未來連任，要讓台灣人民繼續感覺這種惡夢嗎？"
      ]
    };
    this.mouth = React.createRef();
    this.mouthImg = {
      close: require("../imgs/fish-close.png"),
      open: require("../imgs/fish-open.png")
    };
    this.sayingDom = React.createRef();

    this.saying_header = React.createRef();
    this.saying_body = React.createRef();
    this.saying_tail = React.createRef();
  }

  componentDidMount() {
    this.randomTitle();
  }

  handleChange = e => {
    if (e.target.value.replace(/ /g, "").length > 0) {
      this.setState({ politic_title: e.target.value.replace(/ /g, "") });
    } else {
      this.randomTitle();
    }
  };

  randomTitle = e => {
    e && e.preventDefault();

    let oldTitle = this.state.politic_title;
    let rmd = Math.floor(Math.random() * this.state.titles.length);
    let title = this.state.titles[rmd];
    if (title === oldTitle) {
      this.randomTitle();
    } else {
      this.setState({ politic_title: title });
    }
  };

  openMouth = () => {
    this.mouth.current.classList.remove("close");
    this.mouth.current.classList.add("open");
    this.mouth.current.src = this.mouthImg.open;
  };

  closeMouth = () => {
    this.mouth.current.classList.remove("open");
    this.mouth.current.classList.add("close");
    this.mouth.current.src = this.mouthImg.close;
  };

  saying = () => {
    this.setState({ politic_title: "特偵組" });

    this.sayingDom.current.classList.add("open");

    let header = this.state.saying_header[
      Math.floor(Math.random() * this.state.saying_header.length)
    ];
    let body = this.state.saying_body[
      Math.floor(Math.random() * this.state.saying_body.length)
    ];
    let tail = this.state.saying_body[
      Math.floor(Math.random() * this.state.saying_body.length)
    ];

    header = header.replace("特偵組", '<span class="haha">特偵組</span>');
    header = header.replace(
      "English Vegetable",
      '<span class="veg">English Vegetable</span>'
    );
    header = header.replace(
      "True Fish",
      '<span class="tfish">True Fish</span>'
    );

    body = body.replace("特偵組", '<span class="haha">特偵組</span>');
    body = body.replace(
      "English Vegetable",
      '<span class="veg">English Vegetable</span>'
    );
    body = body.replace("True Fish", '<span class="tfish">True Fish</span>');

    tail = tail.replace("特偵組", '<span class="haha">特偵組</span>');
    tail = tail.replace(
      "English Vegetable",
      '<span class="veg">English Vegetable</span>'
    );
    tail = tail.replace("True Fish", '<span class="tfish">True Fish</span>');

    if (body === tail) {
      this.saying();
    } else {
      this.saying_header.current.innerHTML = header;
      this.saying_body.current.innerHTML = body;
      this.saying_tail.current.innerHTML = tail;

      setTimeout(() => {
        //window.scrollTo(0, document.body.scrollHeight);
        document.querySelector('.footer').classList.remove('hide');
      }, 300);
    }
  };

  render() {
    return (
      <div className="politics">
        <label htmlFor="politic_title">政見主題</label>
        <p className="input_container">
          <input
            id="politic_title"
            className="politic_title"
            type="text"
            value={this.state.politic_title}
            onChange={this.handleChange}
          ></input>
          <a href="#" className="random" onClick={this.randomTitle}>
            <i className="fas fa-random"></i>
          </a>
        </p>
        <p className="btn_container">
          <img
            onMouseEnter={this.openMouth}
            onMouseOut={this.closeMouth}
            ref={this.mouth}
            className="fish_mouth close"
            src={this.mouthImg.close}
            onClick={this.saying}
          />
        </p>
        <div className="fish_saying" ref={this.sayingDom}>
          <p>
            <span className="role">主持人：</span>請Korea fish發表政見。
          </p>
          <p>
            <span className="role fish">Korea fish</span>:
          </p>
          <p ref={this.saying_header} className="saying_header"></p>
          <p ref={this.saying_body} className="saying_body"></p>
          <p ref={this.saying_tail} className="saying_tail"></p>
        </div>
      </div>
    );
  }
}

export default Polotics;
