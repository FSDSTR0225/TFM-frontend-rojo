import { Link } from "react-router";

import { CardUser } from "./CardUser";
import { UserMenu } from "./UserMenu";




export const AuthMenu = ({profile, logout}) => {
 

  return (
    <div className='flex items-center'>
          {/* Auth menu content here */}
          {!profile ? (
            <div className='flex gap-2 items-center right-0'>
              <Link
                to={"/login"}
                className=' btn-sm md:btn-md md:w-22 btn rounded-full  bg-primary-60 w-18  hover:bg-primary-70'
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className='btn btn-sm md:btn-md md:w-22 rounded-full  bg-neutral-90 border:-2 border-neutral-60 w-18  hover:bg-neutral-60 '
              >
                Register
              </Link>
            </div>
          ) : (
            <div className='dropdown dropdown-end   items-center gap-4  pr-6 '>
              <CardUser profile={profile}  />
                
            <UserMenu profile={profile} logout={logout}  />
          
              {/* Botones */}
              
            </div>
          )}
        </div>
  )
}
