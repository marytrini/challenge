import React from 'react'
import Form from '../../components/form/Form'
import ButtonHome from '../../components/button/ButtonHome'

const CreateNote = () => {
  return (
    <div className='grid grid-cols-1 2xl:grid-cols-2 gap-5 sm:flex flex-wrap'>
      <div className='ml-[15px] 2xl:col-span-1'>
        <ButtonHome />
      </div>
      <div className='2xl:col-span-1 mt-5'>
        <Form />
      </div>
    </div>
  )
}

export default CreateNote