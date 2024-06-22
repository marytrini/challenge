import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ButtonHome from '../../components/button/ButtonHome'
import ActiveItem from '../../components/activeItem/ActiveItem'
import Modal from '../../components/popUp/Modal'

const ActiveList = () => {
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const navigate = useNavigate();

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
  }, []);

  const handleEdit = (note) => {
    navigate(`/edit/${note.id}`);
    //setEditingNote(note)
    setIsModalOpen(false)
   };  

   const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`);
      setActive(active.filter(note => note.id !== id));
    } catch (error) {
      setError(error.message);
    }
   };

   const handleActive = async (id) => {
    try {
      const note = active.find(note => note.id === id);
      const {title, message, archive} = note;
      const updatedNote = {...note, active: !note.active};
      const updateActiveList = active.map(n  => n.id === id ? updatedNote : n);
      setActive(updateActiveList);
      setSelectedNote(updatedNote);

      await axios.put(`http://localhost:4000/notes/${id}`, { title, message, archive, active: !note.active });
    } catch (error) {
      setError(error.message);
    }
   };

   const handleArchive = async (id) => {
    try {
      const note = active.find(note => note.id === id);
      const { title, message } = note;
      const updatedNote = { ...note, archive: !note.archive };
      const updatedArchivedList = active.map(n => n.id === id ? updatedNote : n);
      setActive(updatedArchivedList);
      setSelectedNote(updatedNote);

      await axios.put(`http://localhost:4000/notes/${id}`, { title, message, archive: !note.archive });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    console.log(note);
  }

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
      <div className='flex items-start ml-5'>
        <ButtonHome />
      </div>
        <div className='w-full h-fit mt-20 mb-10'>
          <h1 className='font-merienda font-black lg:text-8xl sm:text-3xl'><span className='text-rose-600'>Active</span> Notes</h1>
        </div>
      <div>
        {
          active.map((note) => (
            <ActiveItem 
        key={note.id}
        note={note}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onActive={handleActive}
        onNoteClick={handleNoteClick}
        isActive={true}
        />
          )) 
        }
      </div>
      <div>
        {
          selectedNote && (
            <Modal 
            openModal={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            note={selectedNote}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onActive={handleActive}
            onArchive={handleArchive}
            />
          )
        }
      </div>
    </div>
  )
}

export default ActiveList