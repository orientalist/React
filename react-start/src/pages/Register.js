import React, { useEffect, useState } from "react";
import "css/style.scss";
import ManagePanel from "components/ManagePanel";
import { useForm } from "react-hook-form";
import axios from "commons/axios";
import { toast } from "react-toastify";
import auth from "commons/auth";
import _panel_userProfile from "components/UserProfile";

function Register(props) {
  useEffect(() => {
    if (ManagePanel.state.is_show) {
      ManagePanel.setState({ is_show: false });
    }
    _panel_userProfile.closePanel();
  });

  const { register, handleSubmit, errors,getValues } = useForm();

  const watch=value=>{
    return value===getValues().password;
  }

  const onSubmit = async data => {

    //2. 獲取表單數據
    const formData = {
      email: data.email,
      nickName:data.nickName,
      password: data.password
    };

    try {
      let result = await axios.post("auth/register", formData);
      auth.setToken(result.data);

      toast.success("註冊成功");

      _panel_userProfile.refresh();

      props.history.push("/");
    } catch (e) {
      toast.error("帳號已存在");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              name="email"
              ref={register({
                required: "請輸入帳號",
                pattern: {
                  value: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                  message: "帳號格式錯誤"
                }
              })}
              className={`input ${errors.email && "empty"}`}
              type="mail"
              placeholder="Email"
            ></input>
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Nick Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="暱稱"
              name="nickName"
              ref={register({required:false})}
            ></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              name="password"
              ref={register({
                required: "請輸入密碼",
                minLength: {
                  value: 4,
                  message: "密碼格式錯誤"
                }
              })}
              className={`input ${errors.password && "empty"}`}
              type="password"
              placeholder="Password"
            ></input>
            {errors.password && (
              <p className="helper has-text-danger">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="re_password">
            Check Password
          </label>
          <div className="control">
            <input
              name="re_password"
              ref={register({
                required: "請再次輸入密碼",
                minLength: {
                  value: 4,
                  message: "密碼格式錯誤"
                },
                validate:watch
              })}
              className={`input ${errors.re_password && "empty"}`}
              type="password"
              placeholder="Check Password"
            ></input>
            {errors.re_password && (
              <p className="helper has-text-danger">
                {errors.re_password.message}
              </p>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
