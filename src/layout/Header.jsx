
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { SideMenu } from "./components/SideMenu";
import { Navbar } from "./components/Navbar";
import { AuthMenu } from "./components/AuthMenu";

export const Header = () => {
  const { profile, logout } = useContext(AuthContext);

  return (
    <header className='bg-neutral-80 p-2 drawer border-b-1 border-neutral-70'>
      <input
        id='my-drawer-3'
        type='checkbox'
        className='drawer-toggle'
      />
      <div className='drawer-content flex flex-row'>
        {/* Navbar */}
        <Navbar />
        <AuthMenu profile={profile } logout={logout} />

      </div>
      <SideMenu />
    </header>
  );
};
