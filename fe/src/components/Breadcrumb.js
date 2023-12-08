import React from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();
  console.log(breadcrumbs);
  return (
    <div className='text-sm'>Breadcrumb</div>
  )
}

export default Breadcrumb