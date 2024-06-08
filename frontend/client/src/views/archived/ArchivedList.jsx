import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesItem from '../../components/noteItem/NotesItem';
import ButtonHome from '../../components/button/ButtonHome';

const ArchivedList = () => {
  const [archived, setArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArchived = async () => {
      try {
        const response = await axios.get('http://localhost:4000/archived');
        setArchived(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getArchived();
  }, []);

  const handleEdit = (note) => {
    // Define the edit handler for archived notes if needed
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`);
      setArchived(archived.filter(note => note.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleArchive = async (id) => {
    try {
      const note = archived.find(note => note.id === id);
      const { title, message } = note;
      const updatedNote = { ...note, archive: !note.archive };
      const updatedArchivedList = archived.map(n => n.id === id ? updatedNote : n);
      setArchived(updatedArchivedList);

      await axios.put(`http://localhost:4000/notes/${id}`, { title, message, archive: !note.archive });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleActive = async (id) => {
    try {
      const note = archived.find(note => note.id === id);
      const { title, message, archive } = note;
      const updatedNote = { ...note, active: !note.active };
      const updatedArchivedList = archived.map(n => n.id === id ? updatedNote : n);
      setArchived(updatedArchivedList);

      await axios.put(`http://localhost:4000/notes/${id}`, { title, message, archive, active: !note.active });
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div>
        ...loading
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='w-full h-fit mt-20 mb-10'>
        <h1 className='font-merienda font-black lg:text-8xl sm:text-6xl'>
          <span className='text-rose-600'>Archived</span> Notes
        </h1>
      </div>
      <div className='grid grid-cols-1 2xl:grid-cols-2 gap-5 sm:flex flex-wrap mt-20'>
        {archived.map((note) => (
          <NotesItem
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onActive={handleActive}
            isArchived={true} // Pass the isArchived prop
          />
        ))}
      </div>
      <div>
        <ButtonHome />
      </div>
    </div>
  );
};

export default ArchivedList;
