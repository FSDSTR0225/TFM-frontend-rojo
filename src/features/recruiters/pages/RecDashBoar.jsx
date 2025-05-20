import { useDragAndDrop } from '@formkit/drag-and-drop/react'
export const RecDashBoar = () => {
 const [todoList, todos] = useDragAndDrop(
    [
      "Schedule perm",
      "Rewind VHS tapes",
      "Make change for the arcade",
      "Get disposable camera developed",
      "Learn C++",
      "Return Nintendo Power Glove",
    ],
    { group: "tasks" }
  );

  const [doneList, dones] = useDragAndDrop(
    ["Pickup new mix-tape from Beth", "Remind VHS tapes"],
    { group: "tasks" }
  );

  return (
    <div className="flex gap-6 p-6 bg-gray-900 min-h-screen">
      <div className="flex-1 border-2 border-purple-500 rounded-lg p-4 flex flex-col">
        <h2 className="font-mono text-xl text-white text-center mb-4">ToDos</h2>
        <ul ref={todoList} className="space-y-2 flex-1">
          {todos.map((todo) => (
            <li
              key={todo}
              data-label={todo} // ¡IMPORTANTE!
              className="bg-gray-800 text-white p-3 rounded cursor-move font-mono"
            >
              {todo}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 border-2 border-purple-500 rounded-lg p-4 flex flex-col">
        <h2 className="font-mono text-xl text-white text-center mb-4">Complete</h2>
        <ul ref={doneList} className="space-y-2 flex-1">
          {dones.map((done) => (
            <li
              key={done}
              data-label={done} // ¡IMPORTANTE!
              className="bg-gray-800 text-gray-400 line-through p-3 rounded cursor-move font-mono"
            >
              {done}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
