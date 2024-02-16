import React, { useState, useEffect } from "react";
import { useNavigate , Link} from "react-router-dom";
import '../../assets/scss/auth/login.scss';
import Logo from './../../assets/images/logo.png';
import Input from "../../components/form/Input";
import { login } from "../../utils/actions";
import Auth from '../../utils/auth';
import { Paths } from "../../config/Paths";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (name, value) => {
    setData({ ...data, [name]: value })
  };

  const loginHandler = async () => {
    setError('');
    setEmailError('');
    setPasswordError('');

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

    await login(data).then( (res)=>{
      if (res.status == 200){
        console.log('success')
        navigate('/dashboard');
      }
      else {
        setError(res);
        setData({
          email: '',
          password: ''
        });
      }
    });
  };

  useEffect(()=>{
		if(Auth.user_token){
			navigate('/');
		}
	}, [navigate, Auth])  
  
  return (!Auth.user_token?
    <section className="">
      <div className="grid h-screen max-w-lg grid-cols-1 mx-auto">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-auto">
          <div className="mb-5">
            <img src={Logo} className="logo mx-auto" alt="logo" />
            <h1 className="font-bold text-primary text-3xl text-center">Tachyon</h1>
            <div className="text-sm text-red-700 text-center mt-2">{error}</div>
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
            <div className="flex items-center justify-between mb-3">
              <Link className="inline-block align-baseline font-bold text-xs text-primary hover:text-blue-800" to={Paths.register}>
                新規会員登録はこちら
              </Link>
              <Link className="inline-block align-baseline font-bold text-xs text-primary hover:text-blue-800" to="#">
                パスワードを忘れた場合
              </Link>
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
    </section>:null
  )
};

export default Login