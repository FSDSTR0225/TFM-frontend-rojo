import { Link } from "react-router";

import { CardUser } from "./CardUser";
import { UserMenu } from "./UserMenu";



export const AuthMenu = ({profile, logout}) => {
  return (
    <div className='flex gap-2 items-center'>
          {/* Auth menu content here */}
          {!profile ? (
            <div className='flex gap-2 items-center'>
              <Link
                to={"/login"}
                className='btn rounded-full text-neutral-0 bg-primary-60 w-20 mx-2 hover:bg-primary-70 hover:text-neutral-0'
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className='btn rounded-full text-neutral-0 bg-neutral-90 border:-2 border-neutral-60 w-22  hover:bg-neutral-60 hover:text-neutral-0'
              >
                Register
              </Link>
            </div>
          ) : (
            <div className='dropdown dropdown-end   items-center gap-4  pr-6 '>
              <CardUser profile={profile} />
                <UserMenu profile={profile} logout={logout} />
              {/* Botones */}
              
            </div>
          )}
        </div>
  )
}
