import { PiBriefcase, PiStack, PiUsers } from "react-icons/pi"
import { Link } from "react-router"
import logo from '../../assets/CodepplyLogo.svg'


export const SideMenu = ({onClose}) => {
  return (
     <div className='drawer-side z-80'>
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
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
            >
              <PiStack />
              Projects
            </Link>
          </li>
          <li>
            <Link
              to='/offers'
              className='btn bg-neutral-90 m-2 hover:bg-secondary-60'
              onClick={onClose}
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
