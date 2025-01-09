import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('mode'))
  if (darkMode === undefined) {
    localStorage.setItem('mode', false)
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <ToastContainer />
      <Navigation setMode={setDarkMode} mode={darkMode} />

      <main className="py-3 min-h-screen text-slate-900 dark:text-slate-300 
      bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-950">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
