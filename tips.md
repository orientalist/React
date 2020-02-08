## 透過url開啟其他頁面
1. 透過`react-router-dom`(需先安裝react-router-dom)
``` js
import { Link } from 'react-router-dom';

function link(){
    return(
        <Link to='/Newpage'></Link>
    )
}
```
需要配置相應的Router
```js
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NewPage from 'pages/NewPage';

const Router = () => (
  <BrowserRouter>
    <Switch>
        <Route path='/NewPage' component={NewPage}/>
        <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default Router;

```
2. 透過`history`(需先安裝react-router-dom)
   - 若該component並沒有配置於Router內,需import `withRouter`以取得history
   - 導出該component亦須`withRouter`
```js
import { withRouter } from 'react-router-dom';

class Component extends React.Component{

    this.toNewPage=()=>{
        this.props.history.push('/NewPage');
    }

    render(){
        return(
            <div onClick={this.toNewPage}>
            Link
            </div>
        )
    }
}

export default withRouter(Component);
```
---

## SPA(Single Pafe Application)
1. 將重複使用的佈局(Header/Footer)獨立為`Layout`
2. 透過`props.children`將變化的部分渲染入Layout
```js
//Layout
import React from "react";
import Header from "components/Header";

const Layout = props => (
  <div>
    <Header nickName="" />
    {props.children}
  </div>
);

export default Layout;
```
```js
//渲染入Layout的部分
import React from "react";
import Content_Cart from "components/Content_Cart";
import Layout from "Layout";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Content_Cart />
      </Layout>
    );
  }
}

export default Cart;
```
---
## Hook
