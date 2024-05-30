import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const ArchivedList = () => {
  const [archived, setArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const getArchived = async () =>{
      try {
        const response = await axios.get('http://localhost:4000/archived')
        setArchived(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getArchived();
  },[]);
  
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
      <h1 className='font-merienda font-black lg:text-8xl sm:text-6xl'>Archived Notes List</h1>
      </div>
      <ul>
        {
          archived.map((item, index) =>
            <li key={index}>
              <div className='flex flex-col items-center gap-5 mt-2 ml-2'>
                <h6 className='font-pop 2xl:flex items-center gap-2 mt-3 flex-wrap mb-0 sm:block'><span><i className="ri-magic-line text-rose-600"></i></span>{item.title}</h6>
              </div>
            </li>
          )
        }
      </ul>      
    </div>
  )
}

export default ArchivedList