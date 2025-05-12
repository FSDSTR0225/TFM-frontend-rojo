import React from 'react'
import { TiThMenuOutline } from 'react-icons/ti'

export const ModalMenuCard = () => {
  return (
    <div className='self-end'> <details className="dropdown">
    <summary className="btn btn-outline btn-square text-lg btn-sm bg-secondary-40 text-neutral-90  hover:bg-neutral-60 hover:text-neutral-0"><TiThMenuOutline /></summary>
    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </details></div>  

  )
}
