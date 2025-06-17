import React from 'react'

export const StatsAside = ({ stats, loading }) => {
  if (loading) return (
    <aside className="flex flex-col gap-4 justify-around m-4 items-center">
      <h3 className="text-xl font-bold">Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col items-center max-w-50 skeleton" style={{ height: '100px' }} />
        <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col skeleton" style={{ height: '100px' }} />
        <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col skeleton" style={{ height: '100px' }} />
        <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col skeleton" style={{ height: '100px' }} />
      </div>
    </aside>
  )
  return (
    <aside className="flex flex-col gap-4 justify-around m-4 items-center">
      <h3 className="text-xl font-bold">Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <article className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col items-center max-w-50">
          <div className="card-body">
            <h3 className="text-md font-bold text-neutral-0">Offers</h3>
            <p className="text-2xl">{stats?.totalOffers}</p>
            <p className="text-sm text-neutral-20">Active Offers</p>
          </div>
        </article>
        <article className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col">
          <div className="card-body">
            <h3 className="text-md font-bold text-neutral-0">Applications</h3>
            <p className="text-2xl">{stats?.totalApplicants}</p>
            <p className="text-sm text-neutral-20">{stats?.avgDailyApplicationsLast7Days}% Last 7 days</p>
          </div>
        </article>
        <article className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col">
          <div className="card-body">
            <h3 className="text-md font-bold text-neutral-0">Average</h3>
            <p className="text-2xl">{stats?.avgApplicationsPerOffer}</p>
            <p className="text-sm text-neutral-20">Applications per offer</p>
          </div>
        </article>
        <article className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col">
          <div className="card-body">
            <h3 className="text-md font-bold text-neutral-0">Recent</h3>
            <p className="text-2xl">{stats?.applicationsLast7Days}</p>
            <p className="text-sm text-neutral-20">Aplications last week</p>
          </div>
        </article>
      </div>
    </aside>
  )
}

