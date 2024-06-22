import React from 'react'
import {Link} from 'react-router-dom'

const ButtonHome = () => {
  return (
    <div className='m-10'>
        <button className='bg-rose-300 opacity-70 font-pop font-bold border-none  rounded-lg hover:bg-rose-400 hover:text-white p-1'>
            <Link to='/'><i className="ri-arrow-left-wide-line text-rose-600 text-2xl hover:text-white"></i></Link>
        </button>
    </div>
  )
}

export default ButtonHome