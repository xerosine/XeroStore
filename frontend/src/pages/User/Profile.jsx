import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, {isLoading}] = useProfileMutation()

  useEffect(() => {    
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
    } else {
        try {
            const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success('Profile updated succesfully')
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }
  }

  return (
    <div className="container mx-auto mt-[8rem] p-4">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-8">Update Profile</h2>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input p-3 rounded w-full text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-input p-3 rounded w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input p-3 rounded w-full text-black"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input p-3 rounded w-full text-black"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between my-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                disabled={isLoading}
              >
                Update
              </button>
              <Link
                to={"/user-orders"}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
              >My Orders</Link>
            </div>
          </form>
        </div>

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
