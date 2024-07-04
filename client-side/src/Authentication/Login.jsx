"use client";
import { Button, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FaGithub, FaGoogle } from "react-icons/fa";


const from = location.state?.from?.pathname || '/'

export function Login() {

  const { signin, googleLogin, githubLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signin(email, password)
      .then((result) => {
        console.log(result.user);
        navigate('/');
        Swal.fire({
          title: "Login Successful!",
          icon: "success"
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    googleLogin()
      .then((result) => {
        navigate('/');
        Swal.fire("Login Successful");
        console.log(result);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleGithubLogin = (e) => {
    e.preventDefault();
    githubLogin()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <div className="h-20">
        <h2 className="text-4xl font-bold mb-4 text-center pt-10 underline">Login Now</h2>
      </div>
      <form onSubmit={handleSignIn} className="flex max-w-md flex-col gap-4 mx-auto mt-20 rounded-lg bg-gray-100 p-10">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1" name="email" type="email" placeholder="Enter Your Email" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput placeholder="Enter Your Password" name="password" id="password1" type="password" required />
        </div>
        <Button className="bg-[#FA524F]" type="submit">Login</Button>
        <div className="flex items-center gap-5 mx-auto">
          <button onClick={handleGoogleLogin}>
            <FaGoogle />
          </button>
          <button onClick={handleGithubLogin}>
            <FaGithub />
          </button>
        </div>
        <p>Don't Have an Account <Link to='/register'><a className='underline text-blue-600' href="">SignUp</a></Link></p>
      </form>
    </div>
  );
}


export default Login;