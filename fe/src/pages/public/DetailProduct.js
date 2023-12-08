import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetail } from '../../apis'
import { Breadcrumb } from '../../components'

const DetailProduct = () => {

  const { pid, title } = useParams()
  const getDetailProduct = async (req, res) => {
    const response = await getDetail(pid)
    console.log(response);
  }
  useEffect(() => {
    if (pid) getDetailProduct()
  }, [pid])
  return (
    <div>
      <div className='h-[81px] flex items-center justify-center bg-gray-200'>
        <div className='w-main'>
          {title}
          <Breadcrumb />
        </div>
      </div>
    </div>
  )
}

export default DetailProduct