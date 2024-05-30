import React from 'react'

const Header = () => {
  return (
    <header className='w-full max-h-screen leading relaxed content-center'>
      <div className='flex w-full h-full items-center justify-center mt-10 mb-20'>
        <h1 className='font-merienda font-black lg:text-8xl sm:text-6xl'>
          My <span className='text-rose-600'>Notes</span></h1>
      </div>
    </header>
  )
}

export default Header