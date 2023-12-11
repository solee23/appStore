import React from 'react'
import { Link } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {IoMdArrowDropright} from 'react-icons/io'


const Breadcrumb = ({title, category}) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "HOME" },
    { path: "/:category/:pid/:title", breadcrumb: title}
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className='text-sm flex items-center gap-4'>
       {breadcrumbs?.filter(el => !el.match.route === false).map(({ match, breadcrumb }, index, self) => (
        <Link key={match.pathname} to={match.pathname} className='flex items-center hover:text-main gap-1'>
          <span className='capitalizer'>{breadcrumb}</span> 
          {index !== self.length -1 && <IoMdArrowDropright/>}
        </Link>
      ))}
    </div>
  )
}

export default Breadcrumb