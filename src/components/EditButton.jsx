import React from 'react'
import { FiEdit } from 'react-icons/fi'

export const EditButton = ({onClick, classProps}) => {
  return (
    <button onClick={onClick} className={`btn btn-sm btn-soft btn-outline w-20 ${
          classProps && classProps
        }`}><FiEdit />Edit</button>
  )
}
