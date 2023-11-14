import { UserIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation()

  const loggedInUser = localStorage.getItem('loggedInUser')
  const userData = loggedInUser ? JSON.parse(loggedInUser) : null


  const onLogout = () => {
    localStorage.removeItem('loggedInUser')

    toast.success('Logging out..', { position: "bottom-center", duration: 1000, style: { backgroundColor: "black", color: 'white', width: "fit-content" } })


    setTimeout(() => {
      location.replace(pathname)
    }, 1500);
  }

  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        <p className="flex items-center space-x-3">
          {userData ?
            <li className="flex text-white duration-200 font-semibold text-lg"><UserIcon className="h-6 w-6 text-orange-600 mr-2" />{userData.user?.email}</li> :
            <li className="text-white duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>}
          {userData ?
            <li className="text-white duration-200 font-semibold text-lg">
              <span className="hover:cursor-pointer" onClick={onLogout}>Logout</span>
            </li> :
            <li className="text-white duration-200 font-semibold text-lg">
              <NavLink to={"/login"}>Login</NavLink>
            </li>}
        </p>
      </ul>
    </nav>
  );
};

export default Navbar;


