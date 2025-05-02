import { Link } from "react-router";

export const Header = () => {
  return (
    <header class='bg-base-300 p-2 drawer border-b-1 border-base-100'>
      <input
        id='my-drawer-3'
        type='checkbox'
        className='drawer-toggle'
      />
      <div className=' drawer-content flex flex-row'>
        {/* Navbar */}
        <div className='navbar w-full'>
          <div className='flex-none sm:hidden'>
            <label
              htmlFor='my-drawer-3'
              aria-label='open sidebar'
              className='btn btn-square btn-ghost'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-6 w-6 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </label>
          </div>
          <Link to={"/"} className="mr-4 pr-4 flex items-center">
            <img
              src="/src/assets/CodepplyLogo.svg"
              alt="Codepply Logo"
              className="h-6 ml-3"
            />
        </Link>
          <div className='hidden flex-none sm:flex'>
            <ul className='menu-md  menu-horizontal'>
              {/* Navbar menu content here */}

              <li>
                <Link
                  to='/projects'
                  className='btn btn-outline text-base-300 bg-green-600 w-28 mx-2 hover:bg-green-700'
                >
                  {" "}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M3 7h18M3 12h18m-6 5h6'
                    />
                  </svg>
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to='/offers'
                  className='btn btn-outline text-base-300 bg-green-600 w-28 mx-2 hover:bg-green-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M4 6h16M4 10h16m-7 4h7'
                    />
                  </svg>
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex gap-2 items-center '>
          {/* Auth menu content here */}
          <Link
            to={"/"}
            className='btn w-20'
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className=' btn w-20'
          >
            Register
          </Link>
        </div>
        {/* Page content here
    Content */}
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-base-200 min-h-full w-80 p-4'>
          {/* Sidebar content here */}
          <li>
            <Link
              to='/'
              className='btn btn-outline text-base-300 bg-green-600 m-2 hover:bg-green-700'
            >
              {" "}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M3 12h18m-6 6l6-6-6-6'
                />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/portfolios'
              className='btn btn-outline text-base-300 bg-green-600 m-2 hover:bg-green-700'
            >
              {" "}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M3 7h18M3 12h18m-6 5h6'
                />
              </svg>
              Projects
            </Link>
          </li>
          <li>
            <Link
              to='/offers'
              className='btn bg-green-600  m-2 hover:bg-green-700'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M4 6h16M4 10h16m-7 4h7'
                />
              </svg>
              Jobs
            </Link>
          </li>
        </ul>
      </div>
      {/* <nav class="bg-black text-white flex items-center justify-between px-6 py-4">
                        <div class="flex items-center gap-4">
                            <span class="text-green-500 font-bold text-xl flex items-center">
                                Codapply
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 ml-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6h13v13H9zM5 15V6H3v9a2 2 0 002 2h2v-2H5z" />
                                </svg>
                            </span>
                            <div class="flex gap-2">
                                <a href="#" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18m-6 6l6-6-6-6" />
                                    </svg>
                                    Home
                                </a>
                                <a href="#" class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18m-6 5h6" />
                                    </svg>
                                    Portfolios
                                </a>
                                <a href="#" class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16m-7 4h7" />
                                    </svg>
                                    Job Listings
                                </a>
                                <a href="#" class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Mis Aplicaciones
                                </a>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="relative">
                                <input type="text" placeholder="Search talents or jobs..." class="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none w-64 pl-10" />
                                <div class="absolute top-2.5 left-3 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0a7 7 0 1110 0 7 7 0 01-10 0z" />
                                    </svg>
                                </div>
                            </div>
                            <a href="#" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A8.967 8.967 0 0112 15c2.21 0 4.22.805 5.879 2.139M15 11a3 3 0 10-6 0 3 3 0 006 0z" />
                                </svg>
                                Profile
                            </a>
                            <a href="#" class="bg-transparent border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
                                Sign Out
                            </a>
                        </div>
                    </nav> */}
    </header>
  );
};
