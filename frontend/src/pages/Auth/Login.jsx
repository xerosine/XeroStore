import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({email, password}).unwrap()
      dispatch(setCredentials({...res}))
      toast.success('Logged in successfully!')
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }

  return (
    <div>
      <section className="pl-[4.5rem] md:pl-[12rem] flex flex-wrap lg:justify-evenly">
        <div className="mr-[4rem] mt-[5rem] max-w-[80%] lg:max-w-[35%]">
          <h1 className="text-xl md:text-3xl 2xl:text-4xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={submitHandler} className="container lg:w-[35rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="mt-2 p-1 px-2 lg:py-2 lg:w-2/4 border rounded bg-transparent 
                focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="mt-2 p-1 px-2 lg:py-2 lg:w-2/4 border rounded bg-transparent 
                focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              className="bg-indigo-600 text-white font-semibold px-3 py-2 rounded cursor-pointer 
              my-[1rem] hover:bg-indigo-500 disabled:bg-indigo-500"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
            <div className="mt-4">
              <p className="dark:text-slate-200">
                New Customer? {" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-indigo-500 dark:text-indigo-400 font-semibold hover:underline"
                >Register</Link>
              </p>
            </div>
          </form>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=
          M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="lg:h-[96vh] w-[55%] hidden lg:block rounded-lg"
        />
      </section>
    </div>
  );
};

export default Login;
