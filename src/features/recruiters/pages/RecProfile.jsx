import React from 'react'
import { OfferCard } from '../components/OfferCard'
import { useState } from 'react'
import { OfferModal } from '../components/OfferModal'

export const RecProfile = () => {
  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 justify-center items-start">
        {/* Card perfil */}
        <div className="w-full lg:w-1/3 bg-[#161b22] rounded-xl p-6 shadow-md min-h-[575px]">

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-600 rounded-full mb-4" />
            <h2 className="text-lg font-semibold">Mara Rodríguez</h2>
            <p className="text-sm text-gray-400 mb-4">Talent Recruiter</p>
          </div>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            <li>+ Nombre Empresa</li>
            <li>+ Ubicación empresa</li>
            <li>+ Email recruiter</li>
            <li>+ Phone</li>
            <li>+ Url empresa</li>
          </ul>
          <div>
            <h3 className="text-white font-semibold mb-1">Sobre la empresa</h3>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis sapien sed quam dignissim efficitur...
            </p>
          </div>
        </div>

        {/* Sección ofertas */}
        <div className="w-full flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Mis ofertas de empleo</h2>
            <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition cursor-pointer text-sm">
              + Create new offer
            </button>
            <dialog id="my_modal_1" className="modal">
              <OfferModal/>
            </dialog>
          </div>

          {/* Aca falta pintar las ofertas creadas por el recruiter */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
             <OfferCard/>
          </div>

        </div>
      </div>
    </div>
  )
}
