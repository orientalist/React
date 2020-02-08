import decode from "jwt-decode";

const JWT = "jwt_token_id";

const setToken = token => {
  localStorage.setItem(JWT, token);
};

const getToken = () => {
  return localStorage.getItem(JWT);
};

const isLogin = () => {
  const token = getToken();

  return token !== null && !isTokenExpired(token);
};

const isTokenExpired = token => {
  try {
    const info = decode(token);
    if (info.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const getUser = () => {
  const token = getToken();
  if (isLogin()) {
    const user = decode(token);

    return user;
  } else {
    return null;
  }
};

const logOut=()=>{
    localStorage.clear(JWT);
};

const auth = {
  setToken: setToken,
  getUser: getUser,
  logOut:logOut,
  getToken:getToken
};

export default auth;
