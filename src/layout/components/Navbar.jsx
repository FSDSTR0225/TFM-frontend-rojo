import { Link } from "react-router"
import logo from '../../assets/codepplyLogo.svg'


export const Navbar = () => {
  return (
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
          <Link
            to={"/"}
            className='mr-4 pr-4 flex items-center'
          >
            <img
              src={logo}
              alt='Codepply Logo'
              className='h-6 ml-3'
            />
          </Link>
          <div className='hidden flex-none sm:flex'>
            <ul className='menu-md menu-horizontal'>
              {/* Navbar menu content here */}

              {/* Button for Developers */}
              <li>
                <Link
                  to='/developers'
                  className='btn text-neutral-0 bg-neutral-90 w-28 mx-2 hover:bg-primary-60 hover:text-neutral-0 focus:bg-neutral-60  focus:text-neutral-0'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 7h18M3 12h18m-6 5h6'
                    />
                  </svg>
                  Developers
                </Link>
              </li>

              {/* Button for Projects */}
              <li>
                <Link
                  to='/projects'
                  className='btn text-neutral-0 bg-neutral-90 w-28 mx-2 hover:bg-primary-60 hover:text-neutral-0 focus:bg-neutral-60  focus:text-neutral-0'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 7h18M3 12h18m-6 5h6'
                    />
                  </svg>
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to='/offers'
                  className='btn text-neutral-0 bg-neutral-90 w-28 mx-2 hover:bg-secondary-60 hover:text-neutral-0 focus:bg-neutral-60 focus:text-neutral-0'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 10h16m-7 4h7'
                    />
                  </svg>
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>)
}
