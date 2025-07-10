
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { SideMenu } from "./components/SideMenu";
import { Navbar } from "./components/Navbar";
import { AuthMenu } from "./components/AuthMenu";
import { useState } from "react";
import { Notifications } from "./components/Notifications";


export const Header = () => {
  const { profile, logout } = useContext(AuthContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const toggleSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };

  return (
    <header className='bg-neutral-80 py-2 pl-2  drawer border-b-1 border-neutral-70'>
      <input
        id='my-drawer-3'
        type='checkbox'
        className='drawer-toggle'
        checked={openSideMenu}
        onChange={toggleSideMenu}
      />
      <div className='drawer-content flex flex-row'>
        {/* Navbar */}
        <Navbar />

        {/* Bell icon y menú de notificaciones */}
        {/* <div className="mx-4 flex items-center">
          <Notifications/>
        </div> */}

        {/* Menu User */}
        <AuthMenu profile={profile} logout={logout} notifications={notifications} setNotifications={setNotifications} setNotificationsOpen={setNotificationsOpen} getNotificationText={getNotificationText} />
      </div>
      <SideMenu onClose={toggleSideMenu} />
    </header>
  );
};
