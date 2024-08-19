import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <div className="dark">
      <ToastContainer />
      <Navigation />

      <main className="py-3 min-h-screen text-slate-900 dark:text-slate-300 
      bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-950">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
