import  { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const history = useNavigate();
  const [cred, setcred] = useState({ name: "", email: "", password: "" });

 const onsubmit = async (e) => {
   e.preventDefault();
   const response = await axios.post("http://localhost:5000/api/auth/createUser", {
     name: cred.name,
     email: cred.email,
     password: cred.password
   });
   localStorage.setItem("token", response.data.token);
   history("/Login");
 };
 const onchange = (e) => {
  setcred({ ...cred, [e.target.name]: e.target.value });
};

  return (
    <div className=" bg-zinc-800 w-screen h-screen flex justify-center items-center">
      <form action="" className="flex flex-col gap-5" onSubmit={onsubmit}>
        <input
          type="text"
          placeholder="Email"
          className=" bg-transparent border p-2 rounded-xl text-white"
          name="email"
          value={cred.email}
          onChange={onchange}
        />
        <input
          type="text"
          placeholder="Username"
          className=" bg-transparent border p-2 rounded-xl text-white"
          name="name"
          value={cred.name}
          onChange={onchange}
        />
        <input
          type="text"
          placeholder="Password"
          className=" bg-transparent border p-2 rounded-xl text-white"
          name="password"
          value={cred.password}
          onChange={onchange}
        />
        <button
          className=" bg-blue-600 text-white rounded-3xl p-2"
          //   onClick={handleSignUp}
        >
          Signup
        </button>
        <span className="text-zinc-400">
          Already have an account ?{" "}
          <Link to="/login">
            <span className=" text-blue-600">SignIn</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
