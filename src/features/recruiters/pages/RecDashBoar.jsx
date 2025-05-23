import { useDragAndDrop } from '@formkit/drag-and-drop/react'
export const RecDashBoar = () => {
  // Estados iniciales por cada columna
  const pendingItems = ['CV recibido', 'Esperando respuesta'];
  const reviewedItems = ['Revisado por RRHH'];
  const interviewedItems = ['Entrevista agendada'];
  const rejectedItems = ['Rechazado por falta de experiencia'];
  const acceptedItems = ['Oferta aceptada'];

  // Hook para cada estado
  const [pendingRef, pending] = useDragAndDrop(pendingItems, { group: 'kanban' });
  const [reviewedRef, reviewed] = useDragAndDrop(reviewedItems, { group: 'kanban' });
  const [interviewedRef, interviewed] = useDragAndDrop(interviewedItems, { group: 'kanban' });
  const [rejectedRef, rejected] = useDragAndDrop(rejectedItems, { group: 'kanban' });
  const [acceptedRef, accepted] = useDragAndDrop(acceptedItems, { group: 'kanban' });

  const renderColumn = (title, items, ref, color) => (
    <div
      className={`w-72 bg-base-200 rounded-box flex flex-col border-t-4 ${color}`}
    >
      <div className="p-4 border-b border-base-300">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold">{title}</h2>
        </div>
      </div>
      <div
        ref={ref}
        className="flex-1 p-4 space-y-2 overflow-y-auto text-sm text-center text-gray-400"
      >
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item}
              data-label={item}
              className="bg-gray-800 text-white p-3 rounded cursor-move font-mono text-left"
            >
              {item}
            </div>
          ))
        ) : (
          <p>No hay candidatos en esta columna</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen overflow-x-auto">
      {renderColumn('Pending', pending, pendingRef, 'border-blue-500')}
      {renderColumn('Reviewed', reviewed, reviewedRef, 'border-purple-500')}
      {renderColumn('Interviewed', interviewed, interviewedRef, 'border-yellow-500')}
      {renderColumn('Accepted', accepted, acceptedRef, 'border-green-500')}
      {renderColumn('Rejected', rejected, rejectedRef, 'border-red-500')}
    </div>
  );
};
