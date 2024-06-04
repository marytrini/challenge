import React from 'react'
import {Link} from 'react-router-dom'

const ButtonHome = () => {
  return (
    <div className='m-10'>
        <button className='font-pop font-bold border-2 border-solid border-rose-600 rounded-lg hover:bg-rose-400 hover:text-white p-1'>
            <Link to='/'>Home</Link>
        </button>
    </div>
  )
}

export default ButtonHome