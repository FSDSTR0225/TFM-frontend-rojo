import React from 'react';

export const NumbersSection = () => {
  return (
    <div className="flex justify-center items-center w-full mt-8">
      <div className="w-full max-w-250 bg-neutral-80 border border-neutral-60 rounded-3xl py-16 px-16">
        <div className='grid grid-cols-4 gap-8 text-center'>
          <div className="flex flex-col items-center">
            <span className='text-4xl font-bold text-primary-50 mb-2 block'>1000+</span>
            <span className='text-neutral-20 text-sm block'>Desarrolladores</span>
          </div>
          <div className="flex flex-col items-center">
            <span className='text-4xl font-bold text-secondary-50 mb-2 block'>500+</span>
            <span className='text-neutral-20 text-sm block'>Empresas</span>
          </div>
          <div className="flex flex-col items-center">
            <span className='text-4xl font-bold text-primary-50 mb-2 block'>50+</span>
            <span className='text-neutral-20 text-sm block'>Ofertas Activas</span>
          </div>
          <div className="flex flex-col items-center">
            <span className='text-4xl font-bold text-secondary-50 mb-2 block'>95%</span>
            <span className='text-neutral-20 text-sm block'>Satisfacción</span>
          </div>
        </div>
      </div>
    </div>
  );
};

