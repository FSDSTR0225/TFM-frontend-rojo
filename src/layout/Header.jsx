
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { SideMenu } from "./components/SideMenu";
import { Navbar } from "./components/Navbar";
import { AuthMenu } from "./components/AuthMenu";
import { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { formatMessageTime } from "../utils/utils";


export const Header = () => {
  const { profile, logout, notifications, setNotifications } = useContext(AuthContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const toggleSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };

  const getNotificationText = (notif) => {
    if (notif.type === 1) return null;
    const types = {
      2: `${notif.senderName} ha dado like a tu Proyecto`,
      3: `${notif.senderName} ha comentado en tu foto`,
      // añade más tipos según necesites
    };
    return types[notif.type] || "Tienes una nueva notificación";
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
        <div className="mx-4 flex items-center">
          <div className="relative">
            {
              profile && (
                <button
                  type="button"
                  className="relative flex items-center justify-center text-white hover:text-gray-200"
                  aria-label="Notificaciones"
                  onClick={() => setNotificationsOpen((prev) => !prev)}
                >
                  <CiBellOn className="h-6 w-6" />
                  {notifications.filter(notif => notif.type !== 1).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(notif => notif.type !== 1).length}
                    </span>
                  )}
                </button>
              )
            }

            {/* Panel de notificaciones */}
            {profile && notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-xs bg-neutral-70 shadow-lg rounded-xl z-50">
                <div className="flex justify-between items-center px-4 py-3 border-b border-base-200">
                  <span className="font-semibold text-base-content">Notificaciones</span>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-base-content hover:text-error text-xl"
                    aria-label="Cerrar"
                  >
                    ×
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto p-2 space-y-2">
                  {notifications.filter(notif => notif.type !== 1).length > 0 ? (
                    notifications
                      .filter(notif => notif.type !== 1)
                      .map((notif, index) => (
                        <div
                          key={notif._id || `${notif.senderName}-${notif.type}-${index}`}
                          className="w-full bg-neutral-60 text-base-content shadow-md rounded-md p-3"
                        >
                          <div className="text-sm font-medium">
                            {getNotificationText(notif)}
                          </div>
                          <span className="text-xs opacity-60 block mt-1">
                            {formatMessageTime(notif.createdAt)}
                          </span>
                        </div>
                      ))
                  ) : (
                    <div className="p-3 text-sm text-gray-400 text-center">
                      No hay notificaciones
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menu User */}
        <AuthMenu profile={profile} logout={logout} notifications={notifications} setNotifications={setNotifications} setNotificationsOpen={setNotificationsOpen} getNotificationText={getNotificationText} />
      </div>
      <SideMenu onClose={toggleSideMenu} />
    </header>
  );
};
