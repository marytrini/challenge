import React from 'react'
import {RiCheckboxBlankCircleLine,RiCheckboxCircleLine,RiHeartFill,RiDislikeFill} from 'react-icons/ri'

const Modal = ({openModal, closeModal, note, onEdit, onDelete, onArchive, onActive}) => {

    const handleCloseModal = (event) => {
        if(event.target.id === 'ModalContainer'){
            closeModal();
        }
    }
    if(openModal !== true) return null

    const handleEdit = () => onEdit(note);
    const handleDelete = () => onDelete(note.id);
    const handleArchive = () => onArchive(note.id);
    const handleActive = () => onActive(note.id);


  return (
    <div 
    id='ModalContainer' 
    onClick={handleCloseModal} 
    className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm'>
        <div className='p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5'>
            <div className='w-full p-3 justify-center items-cente'>
                <h2 className='font-merienda font-bold text-xl mb-4'>{note.title}</h2>
                <p className='font-pop text-base mb-4'>{note.message}</p>
                <div>
                    <button className='w-8 h-8 rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3' onClick={handleEdit}><i className="ri-edit-line text-rose-600 hover:text-white"></i></button>
                    <button className='w-8 h-8 rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3' onClick={handleDelete}><i className="ri-delete-bin-6-line text-rose-600 hover:text-white"></i></button>
                    <button className='w-8 h-8 rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3' onClick={handleActive}>
                    {
                        note.active ? <RiCheckboxBlankCircleLine className='text-rose-600 hover:text-white'/> : <RiCheckboxCircleLine className='text-rose-600 hover:text-white'/>
                    }
                    </button>
                    <button className='w-8 h-8 rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3' onClick={handleArchive}>
                    {
                        note.archive ? <RiDislikeFill className='text-rose-600 hover:text-white'/> : <RiHeartFill className='text-rose-600 hover:text-white'/>
                    }
                    </button>

                </div>
            </div>
            <button className='absolute top-2 right-2 text-black' onClick={closeModal}>
                &times;
            </button>
        </div>
    </div>
  )
}

export default Modal