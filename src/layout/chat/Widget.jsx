import { useContext } from "react";
import { PiChat } from "react-icons/pi";
import ChatPanel from "./ChatPanel";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "./context/ChatContext";

export function Widget() {
  // const [isOpen, setIsOpen] = useState(false);
  const { profile, token, notifications } = useContext(AuthContext);
  const {toggleChat, isOpen} = useContext(ChatContext);
  const unreadChats = notifications.filter(n => n.type === 1).length;
  // const toggleChat = () => {
  //   setIsOpen(!isOpen);
  // };

return (
    <>
      {token && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative">
            {/* Panel */}
            <div
              className={`z-60
                absolute -bottom-4 -right-6 sm:bottom-16 sm:right-10 w-[95dvw] h-[95dvh] md:right-8 sm:w-[320px] sm:h-[500px]
                bg-neutral-70 rounded-2xl shadow-2xl border border-neutral-60 overflow-hidden
                transform origin-bottom-right
                transition duration-500 ease-in-out
                ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
              `}
              style={{
                boxShadow: '0 50px 50px rgba(0, 0, 0, 0.8)'
              }}
            >
              <ChatPanel onClose={toggleChat} user={profile} />
            </div>

            {/* Botón */}
            <button
              onClick={toggleChat}
              style={{
                background: 'linear-gradient(135deg, #37C848 10%, #0077FF 100%)'
              }}
              className="
                w-14 h-14 rounded-full text-white flex items-center justify-center shadow-2xl hover:brightness-90
                transition transform active:scale-90 duration-150 ease-out relative"
            >
              <PiChat size={28} />
              {unreadChats > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse min-w-[22px] text-center">
                  {unreadChats}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
