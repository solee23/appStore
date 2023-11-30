import React, { useState, useCallback } from 'react'
import { InputFiels, Button } from '../../components'
import { apiLogin, apiRegister } from '../../apis'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import {regiser} from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
	const [payload, setPayload] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	})
	const resetPayload = () =>{
		setPayload({
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		})
	}
	const [register, setRegister] = useState(false)
	const navigate = useNavigate()
	const disPatch = useDispatch()


	const handleSubmit = useCallback(async() => {
		const {firstName, lastName, ...login} = payload
		if(register){
			const response = await apiRegister(payload);
			if(response.success){
				Swal.fire({
					icon: 'success',
					title: 'Thành công.',
					text: response.message,
					showConfirmButton: true,
					confirmButtonText: 'Đăng nhập.'
				  }).then((isConfirmed) => {
					if(isConfirmed){
						setRegister(false)
						resetPayload()
					}
				  })
			}else{
				Swal.fire({
					title: 'Thất bại.',
					text: response.message,
					icon: 'error',
					confirmButtonText: 'Như con cặc.'
				  })
			}
			
		}else{
			const rs = await apiLogin(login)
			if(rs.success){
				disPatch(regiser({isLoggin: true, token: rs.token, resData: rs.resData}))
				navigate(`/${path.HOME}`)
			}else{
				// Swal.fire({
				// 	title: 'Thất bại.',
				// 	text: rs.message,
				// 	icon: 'error',
				// 	confirmButtonText: 'Như con cặc.'
				//   })
			}
		}
	}, [payload, register])
	return (
		<div className='w-screen h-screen relative'>
			<h1 className='w-full text-[50px] font-bold text-gray-100 mb-8 uppercase absolute flex items-center justify-center mt-[100px]'>Chào mừng bạn đến với website lỏ của tui kaka</h1>
			<img
				src='https://ramkedem.com/wp-content/uploads/2016/11/login-bg.jpg'
				className='w-full h-full object-cover'
			/>
			<div className='absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex'>
				<div className='p-8 bg-white rounded-md min-w-[500px] items-center flex-col flex'>
					<h1 className='text-[28px] font-semibold text-gray-800 mb-8'>{register ? 'Đăng ký' : 'Đăng nhập'}</h1>
					{register &&
						<div className='flex gap-2 items-center'>
							<InputFiels
								value={payload.firstName}
								setValue={setPayload}
								nameKey='firstName'
								placeholder='Tên của bạn'
								label='Họ:'
							/>
							<InputFiels
								value={payload.lastName}
								setValue={setPayload}
								nameKey='lastName'
								placeholder='Tên của bạn'
								label='Tên:'
							/>
						</div>
					}
					<InputFiels
						value={payload.email}
						setValue={setPayload}
						nameKey='email'
						placeholder='Email của bạn'
						label='Email:'
					/>
					<InputFiels
						value={payload.password}
						setValue={setPayload}
						nameKey='password'
						type='password'
						placeholder='Mật khẩu của bạn'
						label='Mật khẩu:'
					/>
					<Button
						name={register ? 'Đăng ký' : 'Đăng nhập'}
						handleOnClick={handleSubmit}
						fw
					/>
					<div className='flex justify-between items-center my-2 text-sm w-full'>
						{!register && <span className='text-gray-700 hover:underline cursor-pointer'>Quên mật khẩu</span>}
						{!register && <span className='text-gray-700 hover:underline cursor-pointer' onClick={() => setRegister(true)}>Tạo tài khoản</span>}
						{register && <span className='text-gray-700 hover:underline cursor-pointer w-full text-right' onClick={() => setRegister(false)}>Đăng nhập</span>}
					</div>
				</div>
			</div>
		</div >
	)
}

export default Login