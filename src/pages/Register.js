import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import { changeField, initForm, register } from "../modules/auth";
import { check } from "../modules/user";
import { useNavigate } from "react-router-dom";

const REGISTER = "register";

const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const [err, setErr] = useState("");

  const onChange = (e) => {
    setErr("");
    const { name, value } = e.target;
    dispatch(changeField({ form: REGISTER, key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;

    //入力チェック
    if ([username, password, passwordConfirm].includes("")) {
      setErr("項目はすべてご入力ください。");
      return;
    }

    //相関チェック
    if (password !== passwordConfirm) {
      setErr("パスワードが一致していません。");
      dispatch(changeField({ form: REGISTER, key: "password", value: "" }));
      dispatch(
        changeField({ form: REGISTER, key: "passwordConfirm", value: "" })
      );
      return;
    }
    dispatch(register({ username, password }));
    dispatch(initForm(REGISTER));
  };

  useEffect(() => {
    setErr("");
    dispatch(initForm(REGISTER));
    return () => dispatch(initForm(REGISTER));
  }, [dispatch]);

  useEffect(() => {
    // 論理チェック
    if (authError) {
      if (authError.response.status === 409) {
        setErr("入力したIDは既に使われています。");
        return;
      }

      setErr("会員登録に失敗しました。");
      return;
    }
    if (auth) {
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
      <AuthForm
        type={REGISTER}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={err}
      />
    </AuthTemplate>
  );
};

export default Register;
