import { Link } from "react-router";
import logo from "../../assets/CodepplyLogo.svg";
import { PiBriefcase, PiStack, PiUsers } from "react-icons/pi";
import favicon from "../../assets/CodepplyFly.svg";

export const Navbar = () => {
  return (
    <div className="navbar w-full">
      <div className="flex-none sm:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <Link to={"/"} className="mr-4 pr-4 flex items-center">
        <img
          src={logo}
          alt="Codepply Logo"
          className="h-6 ml-3 sm:hidden md:block "
        />
        <img
          src={favicon}
          alt="Codepply Logo"
          className="h-6 ml-3 hidden sm:block md:hidden"
        />
      </Link>
      <div className="hidden flex-none sm:flex">
        <ul className="md:menu-md menu-horizontal  menu-sm gap-4">
          {/* Navbar menu content here */}

          {/* Button for Developers */}
          <li>
            <Link
              to="/developers"
              className="btn items-center gap-2  bg-neutral-90  hover:bg-primary-60  focus:bg-neutral-60 m-0 w-32 no-noise btn-shadow-black "
            >
              <PiUsers />
              Developers
            </Link>
          </li>

          {/* Button for Projects */}
          <li>
            <Link
              to="/projects"
              className="btn items-center gap-2  bg-neutral-90  hover:bg-primary-60  focus:bg-neutral-60 m-0  w-32 no-noise btn-shadow-black "
            >
              <PiStack />
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/offers"
              className="btn items-center gap-2  bg-neutral-90  hover:bg-primary-60  focus:bg-neutral-60 m-0 w-32 no-noise btn-shadow-black "
            >
              <PiBriefcase />
              Jobs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
