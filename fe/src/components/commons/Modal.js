import React from 'react'
import { useAppStore } from '../../store/useAppStore'

const Modal = () => {
    const {contentModal, setModal} = useAppStore();
  return (
    <div className="absolute w-screen h-screen z-[999]  bg-sky-950/60 flex items-center justify-center"
    onClick={() => setModal(false, null)}>
        {contentModal}
    </div>
  )
}

export default Modal