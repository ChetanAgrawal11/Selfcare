import  { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const history = useNavigate();
  const [cred, setcred] = useState({ email: "", password: "" });
  const onchange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/auth/login", {
    
      email: cred.email,
      password: cred.password
    });
    
    localStorage.setItem("token", response.data.token);
    console.log(localStorage.getItem("token"));
    console.log(response.data.success);
    if(response.data.success){
      history("/");
    }else{
      alert(response.data.mess);
      history("/Login");
    }
    
  };
  return (
    <div className=" bg-zinc-800 w-screen h-screen flex justify-center items-center">
      <form action="" className="flex flex-col gap-5" onSubmit={onsubmit}>
        <input
          type="text"
          placeholder="Email"
          className=" bg-transparent border p-2 rounded-xl text-white"
          name="email" value={cred.email}
          onChange={onchange}
        />
        <input
          type="text"
          placeholder="Password"
          name="password" value={cred.password}
          className=" bg-transparent border p-2 rounded-xl text-white"
          onChange={onchange}
        />
        <button
          className=" bg-blue-600 text-white rounded-3xl p-2"
          // onClick={handleSignIn}
        >
          Login
        </button>
        <span className="text-zinc-400">
          Don't have an account ?
          <Link to="/register">
            <span className=" text-blue-600">SignUp</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
