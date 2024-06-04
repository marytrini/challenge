import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ButtonHome from '../../components/button/ButtonHome'

const ActiveList = () => {
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getActive = async () => {
      try {
        const response = await axios.get('http://localhost:4000/active');
        setActive(response.data);
      } catch (error) {
        setError(error.message);
      } finally{
        setLoading(false);
      }
    }
    getActive();
  }, [])

  if(loading){
    return(
      <div>
        ...loading
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='min-h-screen flex flex-col '>
      <div className='w-full h-fit mt-20 mb-10'>
        <h1 className='font-merienda font-black lg:text-8xl sm:text-6xl'><span className='text-rose-600'>Active</span> Notes</h1>
      </div>
      <ul>
        {
          active.map((item, index) => 
          <li key={index}>
            <div className='flex items-start gap-5 mt-2 w-full 2xl:ml-[600px] sm:ml-60'>
              <h6 className='font-pop 2xl:flex text-left 2xl:text-xl sm:text-lg'><span><i className="ri-check-line text-rose-600"></i></span>{item.title}</h6>
            </div>
          </li>
          )
        }
      </ul>
      <div>
        <ButtonHome />
      </div>
    </div>
  )
}

export default ActiveList