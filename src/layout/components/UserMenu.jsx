
import { PiGear } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

export const UserMenu = ({ profile, logout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ul
      tabIndex={0}
      className='dropdown-content mt-2 menu bg-neutral-60 rounded-box min-w-38 lg:min-w-48 left-1 '
    >
      {profile.role.type === "recruiter" ? (
        <>
          <li>
            <Link
              to={`recruiter/${profile._id}`}
              className=' hover:bg-secondary-70/20'
              
            >
              Ver Perfil
            </Link>
          </li>
          <li>
            <Link
              to={"/settings"}
              className=' p-2 hover:bg-secondary-70/20'
              
            >
              <p className='flex items-center gap-2'>
                <PiGear className='text-xl' />
                Settings
              </p>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to={`profile/${profile._id}`}
              className=' hover:bg-primary-70/20'
            >
              Ver Perfil
            </Link>
          </li>
          <li>
            <Link
              to={"/settings"}
              className=' p-2 hover:bg-primary-70/20'
            >
              <p className='flex items-center gap-2'>
                <PiGear className='text-xl' />
                Settings
              </p>
            </Link>
          </li>
        </>
      )}

      <button
        onClick={handleLogout}
        className='btn btn-sm btn-outline border-red-500 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition'
      >
        Logout
      </button>
    </ul>
  );
};
