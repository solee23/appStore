import React, {useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import path from '../../utils/path'

const FinalRegister = () => {
  const {status} = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if(status ==='success'){
      Swal.fire({
        icon: 'success',
        title: 'Thành công.',
        text: 'Xác nhận tài khoản thành công.',
        showConfirmButton: true,
        confirmButtonText: 'Đăng nhập.'
        }).then((isConfirmed) => {
        if(isConfirmed){
          navigate(`/${path.LOGIN}`)
        }
        })
    }else{
      Swal.fire({
        title: 'Thất bại.',
        text: 'Xác nhận tài khoản thất bại.',
        icon: 'error',
        confirmButtonText: 'Như con cặc.'
        }).then((isConfirmed) => {
        if(isConfirmed){
          navigate(`/${path.HOME}`)
        }
        })
    }
  },[])
  return (
    <div>
      
    </div>
  )
}

export default FinalRegister