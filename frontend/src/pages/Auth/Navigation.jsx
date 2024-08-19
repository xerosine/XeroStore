import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setshowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setshowSidebar(false);
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden justify-between flex-col p-4 text-slate-900 
      dark:text-slate-300 bg-slate-300 dark:bg-slate-950 h-[100vh] fixed group`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center ml-1.5 transition-transform transform hover:translate-x-2"
        >
          <div className="mr-2 mt-[3rem]">
            <AiOutlineHome size={26} />
          </div>
          <span className="nav-item-name mt-[3rem]">Home</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center ml-1.5 transition-transform transform hover:translate-x-2"
        >
          <div className="mr-2 mt-[3rem]">
            <AiOutlineShopping size={26} />
          </div>
          <span className="nav-item-name mt-[3rem]">Shop</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center ml-1.5 transition-transform transform hover:translate-x-2"
        >
          <div className="mr-2 mt-[3rem]">
            <AiOutlineShoppingCart size={26} />
          </div>
          <span className="nav-item-name mt-[3rem]">Cart</span>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center ml-1.5 transition-transform transform hover:translate-x-2"
        >
          <div className="mr-2 mt-[3rem]">
            <FaHeart size={26} />
          </div>
          <span className="nav-item-name mt-[3rem]">Favorite</span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          {console.log(userInfo?.username)}
          {userInfo ? (
            <span>{userInfo.username}</span>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 mt-0.5 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute left-0 mt-2 space-y-2 transition-width duration-200 delay-200 
            w-0 overflow-hidden bg-slate-200 dark:bg-slate-900 group-hover:w-full bottom-8`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to={"/admin/dashboard"}
                    className="block py-2 px-4 hover:bg-slate-400 hover:dark:bg-slate-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/productlist"}
                    className="block py-2 px-4 hover:bg-slate-400 hover:dark:bg-slate-700"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/categorylist"}
                    className="block py-2 px-4 hover:bg-slate-400 hover:dark:bg-slate-700"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/orderlist"}
                    className="block py-2 px-4 hover:bg-slate-400 hover:dark:bg-slate-700"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/userlist"}
                    className="block py-2 px-4 hover:bg-slate-400 hover:dark:bg-slate-700"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to={"/profile"}
                className="block py-2 px-4 hover:bg-slate-400 hover:dark:bg-slate-700"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full text-left py-2 px-4 hover:bg-slate-400 
                hover:dark:bg-slate-700"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center ml-1.5 transition-transform transform hover:translate-x-2"
            >
              <div className="mr-2 mt-[3rem]">
                <AiOutlineLogin size={26} />
              </div>
              <span className="nav-item-name mt-[3rem]">Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center ml-1.5 transition-transform transform hover:translate-x-2"
            >
              <div className="mr-2 mt-[3rem]">
                <AiOutlineUserAdd size={26} />
              </div>
              <span className="nav-item-name mt-[3rem]">Register</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
