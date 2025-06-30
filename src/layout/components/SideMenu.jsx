import { Link } from "react-router"


export const SideMenu = () => {
  return (
     <div className='drawer-side z-90'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-neutral-70 min-h-full w-80 p-4'>
          {/* Sidebar content here */}

          {/* Button for Developers */}
          <li>
            <Link
              to='/developers'
              className='btn text-neutral-0 bg-neutral-90 m-2 hover:bg-primary-60'
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
              className='btn text-neutral-0 bg-neutral-90 m-2 hover:bg-neutral-40'
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
                  d='M3 12h18m-6 6l6-6-6-6'
                />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/projects'
              className='btn text-neutral-0 bg-neutral-90 m-2 hover:bg-primary-60'
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
              className='btn text-neutral-0 bg-neutral-90 m-2 hover:bg-secondary-60'
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

  )
}
