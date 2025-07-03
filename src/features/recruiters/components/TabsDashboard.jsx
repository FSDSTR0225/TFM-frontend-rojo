

export const TabsDashboard = ({activeTab, setActiveTab, lists, colors}) => {
  return (
    <div className="flex flex-wrap border-b-2 border-neutral-30 sm:text-md font-medium mb-4  gap-1 justify-center">
        {Object.entries(lists).map(([key]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={` py-2 px-2  sm:px-4 capitalize transition-all text-sm sm:text-md duration-200 rounded-t-md
          ${activeTab === key
                ? `${colors[key] || 'bg-black'} text-white`
                : 'text-neutral-20'
              }`}
          >
            {key}
          </button>
        ))}
      </div>
  )
}
