import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getCandidatesByOfferId,updateCandidateStatus } from '../../../services/offersServices';
export const RecDashBoar = () => {
 const { offerId } = useParams();

  //objeto con cinco arrays, uno por cada columna del Kanban.
  const [lists, setLists] = useState({
    pending: [],
    reviewed: [],
    interviewed: [],
    accepted: [],
    rejected: [],
  });

  //guarda temporalmente de dónde (qué columna) y qué candidato estamos arrastrando.
  const [dragInfo, setDragInfo] = useState({ fromList: null, candidate: null });


  // 1. Carga candidatos
  useEffect(() => {
    (async () => {
      const data = await getCandidatesByOfferId(offerId, localStorage.getItem('token'));
      console.log('Candidatos obtenidos:', data);
      //Crea grouped, un objeto vacío con las cinco claves.
      const grouped = { pending: [], reviewed: [], interviewed: [], accepted: [], rejected: [] };
      //Recorre cada candidato (data.forEach) y, según su status, lo añade al array correspondiente.
      data.forEach(c => grouped[c.status]?.push(c));
      //Llama a setLists(grouped), que actualiza el estado con los candidatos ya clasificados.
      setLists(grouped);
    })();
  }, [offerId]);

  // Esto es para iniciar el arrastre del drag-and-drop.
  const handleDragStart = (e, candidate, fromList) => {
    //e.dataTransfer.effectAllowed = 'move' indica que vamos a mover este elemento.
    e.dataTransfer.effectAllowed = 'move';
    //Guardamos en dragInfo:
    // fromList: nombre de la columna de origen.
    // candidate: el objeto candidato completo.
    setDragInfo({ fromList, candidate });
  };

  //Esto permiter que el elemento se pueda soltar en la columna de destino.
  const handleDragOver = e => {
    e.preventDefault(); // necesario para permitir el drop
  }; 

  //Esto se dispara al soltar el elemento en la columna de destino.
  const handleDrop = async (e, toList) => {
    e.preventDefault();
    const { fromList, candidate } = dragInfo;
    //Validación: si fromList o candidate están vacíos, o soltar en la misma columna, se sale.
    if (!fromList || !candidate || fromList === toList) return;

    // 3. Mueve en el estado
    setLists(prev => {
       // 1) Quitar de lista origen
      const src = [...prev[fromList]].filter(c => c._id !== candidate._id);
        // 2) Añadir a lista destino (con nuevo status)
      const dst = [...prev[toList], { ...candidate, status: toList }];
      return { ...prev, [fromList]: src, [toList]: dst };
    });
    // 4. Actualiza en backend
    console.log(`Actualizando candidato ${candidate._id} de ${fromList} a ${toList}`);
    await updateCandidateStatus(offerId,candidate._id, toList, localStorage.getItem('token'));
    setDragInfo({ fromList: null, candidate: null });
  };

  const colors = {
    pending: 'border-blue-500',
    reviewed: 'border-purple-500',
    interviewed: 'border-yellow-500',
    accepted: 'border-green-500',
    rejected: 'border-red-500',
  };

  // 5. Render
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen overflow-x-auto">
      {Object.entries(lists).map(([key, items]) => (
        <div
          key={key}
          className={`w-72 bg-base-200 rounded-box flex flex-col border-t-4 ${colors[key]}`}
          onDragOver={handleDragOver}
          onDrop={e => handleDrop(e, key)}
        >
          <div className="p-4 border-b border-base-300">
            <h2 className="text-white font-semibold capitalize">{key}</h2>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto text-sm text-left text-gray-400">
            {items.length > 0 ? (
              items.map(c => (
                <div
                  key={c._id}
                  className="candidate-card bg-gray-800 text-white p-3 rounded cursor-grab active:cursor-grabbing"
                  draggable
                  onDragStart={e => handleDragStart(e, c, key)}
                >
                  <p className="font-bold">{c.user.name}</p>
                  <p className="font-bold">{c.user.email}</p>
                  <p className="text-sm">
                    {new Date(c.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No hay candidatos</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};