import React from 'react';

function MyOffersCard () {

  return (
    <div className="w-full">
                <ol className="space-y-4">
                    <li className="relative grid grid-cols-3 gap-4 bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md">
                      <h3 className="col-span-2 text-xl uppercase font-bold">PROGRAMADOR FRONTEND JR</h3>
                      <p className="col-span-2">Google</p>
                      <p className="col-span-2">Descripción: BLABLALBALBLABLA</p>
                      <div className="flex justify-end gap-4 pt-4">
                        <button className="btn bg-primary-60 text-neutral-0 hover:bg-primary-50 border border-primary-50">
                          Borrar postulación
                        </button>
                        <button className="btn bg-neutral-90 border border-neutral-70 text-neutral-0 hover:text-primary-40">
                          Ver Oferta
                        </button>
                      </div>
                    </li>
                </ol>
    </div>
  );
}

export default MyOffersCard;