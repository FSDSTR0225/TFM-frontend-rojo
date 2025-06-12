// src/components/ChatPanel.jsx
import { useState } from "react";
import { AvatarImage } from "../../components/AvatarImage"; // ajusta la ruta si hace falta

export default function ChatPanel({ onClose, user }) {
  const [screen, setScreen] = useState("welcome");

  const goTo = (next) => setScreen(next);

  return (
    <div className="flex flex-col h-full">
      <div
        className="p-4 border-b border-neutral-60 flex justify-between items-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(55, 200, 72, 0.5) 10%, rgba(0, 119, 255, 0.5) 100%)",
        }}
      >
        <div className="flex items-center space-x-2">
          {/* Avatar del usuario */}
          {user?.avatar ? (
            <AvatarImage user={user} width={9} />
          ) : (
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-0 text-sm font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <h2 className="text-md font-medium">Messages</h2>
        </div>
        <button onClick={onClose} className="text-sm">
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {screen === "welcome" && (
          <div>
            <p>Hola 👋 ¿En qué puedo ayudarte?</p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => goTo("faq")}
                className="block w-full text-left bg-neutral-60 p-2 rounded"
              >
                Ver preguntas frecuentes
              </button>
              <button
                onClick={() => goTo("contact")}
                className="block w-full text-left bg-neutral-60 p-2 rounded"
              >
                Contactar soporte
              </button>
            </div>
          </div>
        )}
        {screen === "faq" && (
          <div>
            <p>📚 Preguntas frecuentes</p>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              <li>¿Cómo registro un proyecto?</li>
              <li>¿Dónde edito mi perfil?</li>
              <li>¿Cómo postulo a ofertas?</li>
            </ul>
            <button
              onClick={() => goTo("welcome")}
              className="mt-4 text-blue-600 text-sm underline"
            >
              ← Volver
            </button>
          </div>
        )}
        {screen === "contact" && (
          <div>
            <p>✉️ Envíanos un mensaje:</p>
            <textarea
              className="mt-2 w-full border rounded p-2 text-sm"
              rows={4}
              placeholder="Escribe tu mensaje..."
            />
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm">
              Enviar
            </button>
            <button
              onClick={() => goTo("welcome")}
              className="mt-4 text-blue-600 text-sm underline"
            >
              ← Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
