import React from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../components/form/Form'
import ButtonHome from '../../components/button/ButtonHome'

const CreateNote = () => {
  
    const navigate = useNavigate();

    const handleSave = () => {
      navigate('/notes');
    }

    
  return (
    <div className='flex flex-col items-center justify-center h-screen p-5'>
      <div className='mb-5 w-full flex'>
        <ButtonHome />
      </div>
      <div className='w-full max-w-2xl 2xl:max-w-xl sm:max-w-sm'>
        <Form onSave={handleSave}/>
      </div>
    </div>
  )
}

export default CreateNote