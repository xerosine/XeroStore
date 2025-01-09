import { useState, useEffect, useRef } from "react";
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
import FavoriteCount from "../Product/FavoriteCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setshowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };

  const closeSidebar = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setshowSidebar(false);
    }
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

  useEffect(() => {
    document.addEventListener("mousedown", closeSidebar);
    return () => {
      document.removeEventListener("mousedown", closeSidebar);
    };
  }, []);

  return (
    <>
      <button
        className="top-3 left-3 bg-slate-200 dark:bg-slate-900 p-2 fixed rounded z-10"
        onClick={toggleSidebar}
      >
        {!showSidebar && (
          <>
            <div className="w-6 h-0.5 bg-indigo-700 dark:bg-indigo-600 my-1"></div>
            <div className="w-6 h-0.5 bg-indigo-700 dark:bg-indigo-600 my-1"></div>
            <div className="w-6 h-0.5 bg-indigo-700 dark:bg-indigo-600 my-1"></div>
          </>
        )}
      </button>
      <div
        style={{ zIndex: 999 }}
        onClick={(e) => closeSidebar(e)}
        ref={sidebarRef}
        className={`${
          showSidebar ? "w-[4%] min-w-[60px] px-4" : "w-0 px-0"
        } lg:w-[4%] lg:min-w-[60px] lg:px-4 flex justify-between py-4 flex-col text-slate-900  
        transition-padding duration-200 ease-linear
        dark:text-slate-300 bg-slate-300 dark:bg-slate-950 min-h-[100vh] fixed group`}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-2 max-h-[50%]">
          <Link
            to="/"
            className="flex items-center text-sm font-semibold lg:text-lg lg:font-normal
            ml-[0.1rem] transition-transform transform hover:translate-x-2"
          >
            <div className="mr-2 mt-10 lg:mt-[3rem] dark:text-indigo-600">
              <AiOutlineHome size={27} />
            </div>
            <span className="nav-item-name mt-10 lg:mt-[3rem]">Home</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center text-sm font-semibold lg:text-lg lg:font-normal
            ml-[0.1rem] transition-transform transform hover:translate-x-2"
          >
            <div className="mr-2 mt-10 lg:mt-[3rem] dark:text-indigo-600">
              <AiOutlineShopping size={27} />
            </div>
            <span className="nav-item-name mt-10 lg:mt-[3rem]">Shop</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center text-sm font-semibold lg:text-lg lg:font-normal
            ml-[0.1rem] transition-transform transform hover:translate-x-2"
          >
            <div className="mr-2 mt-10 lg:mt-[3rem] dark:text-indigo-600">
              <AiOutlineShoppingCart size={27}/>
            </div>
            <span className="nav-item-name mt-10 lg:mt-[3rem]">Cart</span>
            <div className="absolute left-[20px] top-[35px]">
              {cartItems.length > 0 && (
                <span
                  className="px-1.5 py-0 font-semibold text-sm bg-indigo-600 text-white rounded-full
                dark:text-indigo-400 dark:bg-slate-800"
                >
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </div>
          </Link>
          <Link
            to="/favorites"
            className="flex items-center text-sm font-semibold lg:text-lg lg:font-normal
            ml-[0.1rem] transition-transform transform hover:translate-x-2"
          >
            <div className="mr-2 mt-10 lg:mt-[3rem] dark:text-indigo-600">
              <FaHeart size={27} />
            </div>
            <span className="nav-item-name mt-10 lg:mt-[3rem]">Favorites</span>
            <FavoriteCount />
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
          >
            {userInfo ? (
              <span>{userInfo.username.substring(0, 2)}</span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  dropdownOpen ? "rotate-180" : ""
                } h-4 w-4 ml-1 mt-0.5`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
          {userInfo && (
            <ul
              className={`${dropdownOpen ? "h-[17rem] md:h-[19.5rem] lg:h-[23rem] py-1.5" : "h-0 py-0"} 
              mt-2 absolute left-0 space-y-1 md:space-y-2 [transition:width_200ms_200ms,height_300ms]
              w-0 overflow-hidden bg-slate-200 dark:bg-slate-900 group-hover:w-full bottom-8`}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to={"/admin/dashboard"}
                      className="block py-[.4rem] px-3 md:py-2 md:px-4 hover:bg-slate-400 hover:dark:bg-slate-700
                      text-[.85rem] lg:text-lg"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/admin/productlist"}
                      className="block py-[.4rem] px-3 md:py-2 md:px-4 hover:bg-slate-400 hover:dark:bg-slate-700
                      text-[.85rem] lg:text-lg"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/admin/categorylist"}
                      className="block py-[.4rem] px-3 md:py-2 md:px-4 hover:bg-slate-400 hover:dark:bg-slate-700
                      text-[.85rem] lg:text-lg"
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/admin/orderlist"}
                      className="block py-[.4rem] px-3 md:py-2 md:px-4 hover:bg-slate-400 hover:dark:bg-slate-700
                      text-[.85rem] lg:text-lg"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/admin/userlist"}
                      className="block py-[.4rem] px-3 md:py-2 md:px-4 hover:bg-slate-400 hover:dark:bg-slate-700
                      text-[.85rem] lg:text-lg"
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to={"/profile"}
                  className="block py-[.4rem] px-3 md:py-2 md:px-4 hover:bg-slate-400 hover:dark:bg-slate-700
                  text-[.85rem] lg:text-lg"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left py-[.4rem] px-3 md:py-2 md:px-4 hover:bg-slate-400 
                  hover:dark:bg-slate-700 text-sm lg:text-lg"
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
                className="flex items-center ml-[0.1rem] text-sm font-semibold 
                lg:text-lg lg:font-normal transition-transform transform hover:translate-x-2"
              >
                <div className="mr-2 mt-[3rem]">
                  <AiOutlineLogin size={27} className="dark:text-indigo-600" />
                </div>
                <span className="nav-item-name mt-[3rem]">Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center ml-[0.1rem] text-sm font-semibold 
                lg:text-lg lg:font-normal transition-transform transform hover:translate-x-2"
              >
                <div className="mr-2 mt-[3rem]">
                  <AiOutlineUserAdd
                    size={27}
                    className="dark:text-indigo-600"
                  />
                </div>
                <span className="nav-item-name mt-[3rem]">Register</span>
              </Link>
            </li>
          </ul>
        )}
        <div
          className="bg-slate-600 dark:bg-indigo-800 absolute top-0 right-0 w-[1px] h-0 
          transition-[height] duration-[1500ms] ease-linear group-hover:h-[100%]"
        ></div>
      </div>
    </>
  );
};

export default Navigation;
