import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from './../../assets/images/logo.png';
import Input from "../../components/form/Input";
import { adminLogin } from "../../utils/actions";
import { Paths } from '../../config/Paths';


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (name, value) => {
    setData({ ...data, [name]: value })
  };

  const loginHandler = () => {

    // set initial error values to empty
    setEmailError('');
    setPasswordError('');

    // validation check if the user has entered both fields correctly
    if ('' === data.email) {
      setEmailError('メールは必須です。');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      setEmailError("無効なメールです。");
      return;
    }

    if ("" === data.password) {
      setPasswordError("パスワードは必須です。");
      return;
    }

    if (data.password.length < 7) {
      setPasswordError("パスワードは8文字以上である必要があります。");
      return;
    }

    // Authentication calls will be made here.
    adminLogin(data)
      .then(res => {
        if (res.status == 200) {
          navigate(Paths.adminDashboard);
        }
      });
  };

  return (
    <section className="">
      <div className="grid h-screen max-w-lg grid-cols-1 mx-auto">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-auto">
          <div className="mb-5">
            <img src={Logo} className="logo mx-auto" alt="logo" />
            <h1 className="font-bold text-primary text-3xl text-center">Tachyon</h1>
          </div>
          <form className="">
            <div className="mb-3">
              <Input
                name="email"
                type="email"
                label="email"
                placeholder="メール"
                value={data.email}
                handleChange={handleInputChange}
              />
              <label className="text-sm text-red-700">{emailError}</label>
            </div>
            <div className="mb-3">
              <Input
                name="password"
                type="password"
                label="password"
                placeholder="パスワード"
                value={data.password}
                handleChange={handleInputChange}
              />
              <label className="text-sm text-red-700">{passwordError}</label>
            </div>
            <div className="flex items-center justify-end mb-3">
              <a className="inline-block align-baseline font-bold text-xs text-primary hover:text-blue-800" href="#">
                パスワードを忘れた場合
              </a>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-primary text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={loginHandler}
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
};

export default Login