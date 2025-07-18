import { useState } from "react";
import { updateCandidateStatus } from "../../../services/offersServices";
import { AvatarImage } from "../../../components/AvatarImage";
import { NameUsers } from "../../../components/NameUsers";
import { getDaysSince } from "../../../utils/utils";
import { PiInfo } from "react-icons/pi";

export const RecDashBoar = ({
  offerId,
  lists,
  setLists,
  setIsOpenApplicantsModal,
}) => {
  //guarda temporalmente de dónde (qué columna) y qué candidato estamos arrastrando.
  const [dragInfo, setDragInfo] = useState({ fromList: null, candidate: null });
  // Esto es para iniciar el arrastre del drag-and-drop.
  const handleDragStart = (e, candidate, fromList) => {
    //e.dataTransfer.effectAllowed = 'move' indica que vamos a mover este elemento.
    e.dataTransfer.effectAllowed = "move";
    //Guardamos en dragInfo:
    // fromList: nombre de la columna de origen.
    // candidate: el objeto candidato completo.
    setDragInfo({ fromList, candidate });
  };

  //Esto permiter que el elemento se pueda soltar en la columna de destino.
  const handleDragOver = (e) => {
    e.preventDefault(); // necesario para permitir el drop
  };

  //Esto se dispara al soltar el elemento en la columna de destino.
  const handleDrop = async (e, toList) => {
    e.preventDefault();
    const { fromList, candidate } = dragInfo;
    //Validación: si fromList o candidate están vacíos, o soltar en la misma columna, se sale.
    if (!fromList || !candidate || fromList === toList) return;

    // 3. Mueve en el estado
    setLists((prev) => {
      // 1) Quitar de lista origen
      const src = [...prev[fromList]].filter((c) => c._id !== candidate._id);
      // 2) Añadir a lista destino (con nuevo status)
      const dst = [...prev[toList], { ...candidate, status: toList }];
      return { ...prev, [fromList]: src, [toList]: dst };
    });
    // 4. Actualiza en backend
   
    const daysAgo = getDaysSince(candidate?.appliedDate);
    await updateCandidateStatus(
      offerId,
      candidate._id,
      toList,
      localStorage.getItem("token")
    );
    setDragInfo({ fromList: null, candidate: null });
  };

  const colors = {
    pending: "border-blue-500",
    reviewed: "border-purple-500",
    interviewed: "border-yellow-500",
    accepted: "border-green-500",
    rejected: "border-red-500",
  };

  // 5. Render
  return (
    <div className="hidden lg:grid grid-cols-5  gap-4 py-4  min-h-screen w-full overflow-x-auto">
      {Object.entries(lists).map(([key, items]) => (
        <div
          key={key}
          className={` bg-neutral-80 rounded-box grid grid-cols-1 grid-rows-[auto_1fr] items-start border-t-4 ${colors[key]}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, key)}
        >
          <div className="p-4 border-b border-neutral-60">
            <h2 className="font-semibold capitalize">{key}</h2>
          </div>
          <div className="p-4 space-y-2 text-sm text-left">
            {items.length > 0 ? (
              items.map((c) => (
                <div
                  key={c._id}
                  className="bg-neutral-60 p-4 rounded flex flex-col  gap-2 mb-4 cursor-grab active:cursor-grabbing  "
                  draggable
                  onDragStart={(e) => handleDragStart(e, c, key)}
                >
                  <div className="flex justify-between">
                    <AvatarImage user={c.user} width={6} />
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsOpenApplicantsModal(c)}
                    >
                      <PiInfo className="text-secondary-30 hover:text-secondary-50 text-3xl z-48 size-6" />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <NameUsers
                      user={c.user}
                      align="items-start"
                      classProps={" line-clamp-1"}
                    >
                      {c.user.role.developer.professionalPosition}
                    </NameUsers>

                    {/* <p className="font-semibold text-base leading-tight">{c.user.name} {c.user.surname}</p> */}

                    <p className="text-[10px] text-neutral-30 mt-1">
                      Last {getDaysSince(c.appliedDate)} days ago
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No candidates</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
