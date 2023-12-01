import React, {useState} from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiReset } from '../../apis/auth'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'


const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const {token} = useParams()
  const navigate = useNavigate()
  console.log(token);
  const handdleResetPassword = async() => {
    const response = await apiReset({password,token})
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công.',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Đăng nhập.'
      }).then((isConfirmed) => {
        if (isConfirmed) {
          navigate(`/${path.LOGIN}`)
        }
      })
    } else {
      Swal.fire({
        title: 'Thất bại.',
        text: response.message,
        icon: 'error',
        confirmButtonText: 'Như con cặc.'
      })
  }
}
  return (
    <div>
      <div className='absolute top-0 left-0 bottom-0 right-0 bg- bg-white flex flex-col items-center py-8 z-50'>
				<div className='flex flex-col gap-4'>
					<label htmlFor='password'>Mật khẩu:</label>
					<input
						id='password'
						type='text'
						className='w-[800px] pb-4 border-b outline-none placeholder:text-sm'
						placeholder='Nhập mật khẩu.'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<div className='w-full flex items-center justify-end gap-4'>
						<Button
							name='Xác nhận'
							handleOnClick={handdleResetPassword}
						/>
					</div>
				</div>
			</div>
    </div>
  )
}

export default ResetPassword