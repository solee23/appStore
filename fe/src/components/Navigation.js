import React from 'react'
import navigations from '../utils/constant'
import { NavLink } from 'react-router-dom'


const Navigation = () => {
  return (
    <div className="border-y w-main h-[50px] py-2 text-sm flex items-center">
      {navigations.map(el => (
        <NavLink key={el.id} to={el.path} className={({isActive}) =>  isActive ? "pr-12 hover:text-main text-main" : "pr-12 hover:text-main"}>
          {el.text}
        </NavLink>
      ))}
    </div>
  )
}

export default Navigation