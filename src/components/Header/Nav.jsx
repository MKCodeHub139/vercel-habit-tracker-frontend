import { useMutation, useQuery } from "@apollo/client/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/analytics/headerCards/useGetUser";
import { IoIosAdd } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { LogoutUser } from "../../graphql/mutations";
import logo from '../../assets/habitbridge-logo-white.svg';
import { useState } from "react";
const Nav = () => {
  const [mobileNav,setMobileNav] =useState(false)
  const handleLogout = async () => {
    const res = await Logout_User({ variables: { id: user?.getUser?.id } });
    let confirmed =confirm('Are you sure you want to logout')
    if(confirmed && res){
        navigate("/login");
    }
  };
  const { user } = useGetUser();
  const [Logout_User] = useMutation(LogoutUser);
  const navigate = useNavigate();
  return (
    <>
    <div className="main text-[#FFFFFF] sticky top-0 flex items-center z-40 ">
      <nav className="flex sm:justify-evenly justify-between items-center w-full mx-auto bg-[#FF5722] rounded-2xl mt-2 py-2 px-4 ">
       <div className="logo flex-shrink-0 flex items-center justify-center w-[220px] sm:w-[280px] md:w-[320px] h-[2.5rem] relative">
      <Link to="/" className="flex items-center justify-center w-full">
        <img src={logo} alt="logo" className="max-h-[10rem] w-auto object-contain"/>
      </Link>
    </div>
        <ul className="hidden sm:flex">
          {user ? (
            <li className="flex items-center gap-5">
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-[#FFC107]  border-[#F9AFAF] hover:bg-[#f1b707]"
                      : ""
                  } text-4xl cursor-pointer border-2 hover:bg-[#FFC107]  hover:border-[#F9AFAF] rounded-full px-3`
                }
              >
                <IoIosAdd />
              </NavLink>

              <p className="flex items-center gap-2 text-xl">
                <FaUserCircle />
                {user?.getUser?.name}
              </p>

              <button
                className="cursor-pointer border-2 bg-orange-600 hover:bg-orange-700 hover:border-fuchsia-100 rounded-full py-1 px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <div className="btns flex gap-4 h-[100%]">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#FFC107]  border-0"
                        : ""
                    } cursor-pointer border-2 hover:bg-[#f1b707]  hover:border-0 rounded-full py-1 px-3`
                  }
                >
                  Signup
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#FFC107]  border-fuchsia-100"
                        : ""
                    } cursor-pointer border-2 hover:bg-[#f1b707]  hover:border-0 rounded-full py-1 px-3`
                  }
                >
                  Login
                </NavLink>
              </div>
            </li>
          )}
        </ul>
        <div className="mobile-nav sm:hidden "onClick={(e)=>setMobileNav(!mobileNav)}>
          <FaUserCircle className="cursor-pointer text-3xl"/>
        </div>
      </nav>
    </div>
        <div className={`mobile-menu absolute right-0 top-[4rem] h-[40vh] w-[90vw] sm:hidden  z-48 text-[#FFFF] bg-[#afd9ec] rounded-2xl ${mobileNav ? "block":'hidden'}`} >
              <ul className={`p-5 `}>
          {user ? (
            <li className="flex flex-col gap-5">
              <p className="flex items-center gap-2 text-xl">
                <FaUserCircle />
                {user?.getUser?.name}
              </p>
              <NavLink 
                to="/create"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-[#FFC107]  border-[#F9AFAF] hover:bg-[#f1b707]"
                      : ""
                  } text-4xl cursor-pointer border-2 hover:bg-[#FFC107]  hover:border-[#F9AFAF] rounded-full px-3 flex justify-center`
                }
              >
                <IoIosAdd />
              </NavLink>


              <button
                className="cursor-pointer border-2 bg-orange-600 hover:bg-orange-700 hover:border-fuchsia-100 rounded-full py-1 px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <div className="btns flex gap-4 h-[100%]">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#FFC107]  border-0"
                        : ""
                    } cursor-pointer border-2 hover:bg-[#f1b707]  hover:border-0 rounded-full py-1 px-3`
                  }
                >
                  Signup
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#FFC107]  border-fuchsia-100"
                        : ""
                    } cursor-pointer border-2 hover:bg-[#f1b707]  hover:border-0 rounded-full py-1 px-3`
                  }
                >
                  Login
                </NavLink>
              </div>
            </li>
          )}
        </ul>
        </div>
        </>
  );
};

export default Nav;
