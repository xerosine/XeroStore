import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-slate-200 dark:bg-slate-900 p-2 fixed rounded`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-indigo-700 dark:bg-indigo-600 my-1"></div>
            <div className="w-6 h-0.5 bg-indigo-700 dark:bg-indigo-600 my-1"></div>
            <div className="w-6 h-0.5 bg-indigo-700 dark:bg-indigo-600 my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-slate-200 dark:bg-slate-800 p-2 fixed right-8 top-7">
          <ul className="list-none m-1">
            <li>
              <NavLink
                className="list-item p-3 block rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700 
                border-l-2 border-transparent hover:border-indigo-600"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(99 102 241)" : "",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item p-3 block rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700 
                border-l-2 border-transparent hover:border-indigo-600"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(99 102 241)" : "",
                })}
              >
                Manage users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item p-3 block rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700 
                border-l-2 border-transparent hover:border-indigo-600"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(99 102 241)" : "",
                })}
              >
                All products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item p-3 block rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700 
                border-l-2 border-transparent hover:border-indigo-600"
                to="/admin/product/create"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(99 102 241)" : "",
                })}
              >
                Create Product
              </NavLink>
            </li> 
            <li>
              <NavLink
                className="list-item p-3 block rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700 
                border-l-2 border-transparent hover:border-indigo-600"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(99 102 241)" : "",
                })}
              >
                Manage Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item p-3 block rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700 
                border-l-2 border-transparent hover:border-indigo-600"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(99 102 241)" : "",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
