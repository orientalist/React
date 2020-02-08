import React,{useMemo} from "react";
import Header from "components/Header";
import auth from 'commons/auth';

const Layout = props => {

  const user=useMemo(()=>{
    return auth.getUser();
  },[]);

  return(
    <div>
      <Header nickName={user&&(user.nickName||'Guseter')} />
      {props.children}
    </div>
  )
};

export default Layout;
