import { PiBriefcase, PiStack, PiUsers } from "react-icons/pi"
import { Link } from "react-router"
import logo from '../../assets/CodepplyLogo.svg'


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
              to='../'
              className="self-center flex"
              >
                <img
                  src={logo}
                  alt="Codepply Logo"
                  className="h-6"
                />
              </Link> 
          </li> 
          <div className="mt-4">
            <li>
            <Link
              to='/developers'
              className='btn bg-neutral-90 m-2 hover:bg-primary-60 gap-2'
            >
              <PiUsers />
              Developers
            </Link>
          </li>

          {/* Button for Projects */}
          
          <li>
            <Link
              to='/projects'
              className='btn bg-neutral-90 m-2 hover:bg-primary-60'
            >
              <PiStack />
              Projects
            </Link>
          </li>
          <li>
            <Link
              to='/offers'
              className='btn bg-neutral-90 m-2 hover:bg-secondary-60'
            >
              <PiBriefcase />
              Jobs
            </Link>
          </li>
          </div>
          
        </ul>
      </div>

  )
}
