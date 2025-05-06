import React from 'react'

export const SectionOffers = ({children, classProps}) => {
  return (
    <section className={`flex flex-col justify-center w-[95vw] md:w-[90vw] lg:w-[75vw] bg-base-400 p-4  md:p-10 md:mx-auto -ml-3 items-center shadow-md ${
        classProps && classProps
      }`}>
            {children}
        </section>
  )
}
