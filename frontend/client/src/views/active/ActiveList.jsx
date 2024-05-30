import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div className='min-h-screen flex flex-col bg-rose-50'>
      <div className='w-full h-fit mt-20'>
        <h1 className='font-merienda font-black lg:text-8xl sm:text-6xl'>Active Notes List</h1>
      </div>
      <ul>
        {
          active.map((item, index) => 
          <li key={index}>
            <div className='flex flex-col items-center gap-5 mt-2 ml-2'>
              <h6 className='font-pop 2xl:flex items-center gap-2 mt-3 flex-wrap mb-0 sm:block'><span><i className="ri-check-line text-rose-600"></i></span>{item.title}</h6>
            </div>
          </li>
          )
        }
      </ul>
    </div>
  )
}

export default ActiveList