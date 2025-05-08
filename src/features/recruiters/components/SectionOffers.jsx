import React from 'react'

export const SectionOffers = ({children, classProps}) => {
  return (
    <section className={`flex flex-col justify-center w-[95vw] md:w-[90vw] lg:w-[75vw] bg-base-400 -ml-3 md:p-4 md:mx-auto ${classProps || ""}`}>
            {children}
        </section>
  )
}
