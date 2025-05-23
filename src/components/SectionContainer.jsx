import React from 'react'

export const SectionContainer = ({children, classProps}) => {
  return (
    <section className={`flex flex-col justify-center max-w-screen-xl mx-auto p-4 ${classProps || ""}`}>
            {children}
        </section>
  )
}
