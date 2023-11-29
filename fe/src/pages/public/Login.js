import React, { useState, useCallback } from 'react'
import { InputFiels, Button} from '../../components'

const Login = () => {
	const [payload, setPayload] = useState({
		email: '',
		password: '',
		name: ''
	})
	const [register, setRegister] = useState(false)
	const handleSubmit = useCallback(() =>{
		console.log(payload);
	},[payload])
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
				{ register && 				
				<InputFiels
					value={payload.name}
					setValue={setPayload}
					nameKey='name'
					label='Name:'
				/>}
				<InputFiels
					value={payload.email}
					setValue={setPayload}
					nameKey='email'
					label='Email:'
				/>
				<InputFiels
					value={payload.password}
					setValue={setPayload}
					nameKey='password'
					type='password'
					label='Mật khẩu:'
				/>
				<Button
					name={register ? 'Đăng ký' : 'Đăng nhập'}
					handleOnClick={handleSubmit}
					fw
				/>
				<div className='flex justify-between items-center my-2 text-sm w-full'>
					{!register && <span className='text-gray-700 hover:underline cursor-pointer'>Quên mật khẩu</span>}
					{!register && <span className='text-gray-700 hover:underline cursor-pointer' onClick={() =>setRegister(true)}>Tạo tài khoản</span>}
					{register && <span className='text-gray-700 hover:underline cursor-pointer w-full text-right' onClick={() =>setRegister(false)}>Đăng nhập</span>}
				</div>
				</div>
			</div>
		</div >
	)
}

export default Login