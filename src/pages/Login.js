import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import auth, { changeField, initForm, login } from "../modules/auth";
import { check } from "../modules/user";
import { Helmet } from "react-helmet-async";

const LOGIN = "login";

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const [err, setErr] = useState("");

  const onChange = (e) => {
    setErr("");
    const { name, value } = e.target;
    dispatch(changeField({ form: LOGIN, key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;

    dispatch(login({ username, password }));
    dispatch(initForm(LOGIN));
  };

  useEffect(() => {
    setErr("");
    dispatch(initForm(LOGIN));
    return () => dispatch(initForm(LOGIN));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setErr("ID、またはパスワードを確認してください。");
    }
    if (auth) {
      //TODO
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history("/");
    }

    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("localStorage is not working.");
    }
  }, [user, history]);

  return (
    <AuthTemplate>
      <Helmet>
        <title>LOG IN</title>
      </Helmet>
      <AuthForm
        type={LOGIN}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={err}
      />
    </AuthTemplate>
  );
};

export default Login;
