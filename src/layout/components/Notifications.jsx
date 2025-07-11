import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { formatMessageTime } from "../../utils/utils";
import { CiBellOn } from "react-icons/ci";

export const Notifications = () => {
    const { profile, notifications } = useContext(AuthContext);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    console.log("Notificaciones:", notifications);
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
        <div className="relative ">
            {
                profile && (
                    <button
                        type="button"
                        className="relative flex items-center justify-center text-white hover:text-gray-200 cursor-pointer"
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
                <div className="absolute left-1/7 transform -translate-x-1/2 top-3/2 mt-2 w-80 max-w-xs bg-neutral-70 shadow-lg rounded-xl z-50">
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
    )
}
