import _axios from "axios";
import auth from 'commons/auth';

const axios = baseURL => {
  const instance = _axios.create({
    baseURL:baseURL || process.env.REACT_APP_API_DOMAIN ||"http://localhost:3001/",
    timeout: 1000
  });

  instance.interceptors.request.use(function(config){
    const token=auth.getToken();
    config.headers['Authorization']=`Bearer ${token}`;
    
    return config;
  },function(error){
    return Promise.reject(error);
  });

  return instance;
};



const cartHook={
  shouldCallback:true,
  subscribe:function(callBack){
    axios().get('cart').then(resp=>{
      if(this.shouldCallback){
        callBack(resp.data);
      }
    });
  },
  unSubscribe:function(){
    this.shouldCallback=false;
  }
};

const productHook={
  shouldCallback:true,
  subscribe:function(queryString,callBack){
    axios().get(`products?${queryString}`).then(resp=>{
      callBack(resp.data);
    });
  },
  unSubscribe:function(){
    this.shouldCallback=false;
  }
};

export {axios,cartHook,productHook};

export default axios();
