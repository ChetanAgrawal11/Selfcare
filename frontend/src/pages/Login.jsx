import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className=" bg-zinc-800 w-screen h-screen flex justify-center items-center">
      <form action="" className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Email"
          className=" bg-transparent border p-2 rounded-xl text-white"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          className=" bg-transparent border p-2 rounded-xl text-white"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className=" bg-blue-600 text-white rounded-3xl p-2"
          // onClick={handleSignIn}
        >
          Login
        </button>
        <span className="text-zinc-400">
          Don't have an account ?
          <Link to="/signup">
            <span className=" text-blue-600">SignUp</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
