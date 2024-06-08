import React,{useState, useEffect} from 'react'
import axios from 'axios'
import NotesItem from '../../components/noteItem/NotesItem';
import Form from '../../components/form/Form';
import ButtonHome from '../../components/button/ButtonHome';
import Modal from '../../components/popUp/Modal';

const NotesList = () => {
  const [noteList, setNotesList]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  const getNotes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/notes');
        setNotesList(response.data);
        console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }
  }

  getNotes();
  },[]);

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`);
      setNotesList(noteList.filter(note => note.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleArchive = async (id) => {
    try {
      const note = noteList.find(note => note.id === id);

      const {title,message} = note;
      const updatedNote = {...note, archive: !note.archive}
      const updateNoteList = noteList.map(n => n.id === id ? updatedNote : n)
      setNotesList(updateNoteList);
      setSelectedNote(updatedNote);

      await axios.put(`http://localhost:4000/notes/${id}`,{title, message, archive: !note.archive})
    } catch (error) {
      setError(error.message);
    }
  }

  const handleActive = async (id) => {
    try {
      const note = noteList.find(note => note.id === id);

      const {title, message, archive} = note;
      const updatedNote = {...note, active: !note.active};
      const activeNotes = noteList.map(n => n.id === id ? updatedNote : n)
      setNotesList(activeNotes);
      setSelectedNote(updatedNote);

      await axios.put(`http://localhost:4000/notes/${id}`,{title, message, archive, active: !note.active})
    } catch (error) {
      setError(error.message);
    }
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    console.log(note);
  }

  const handleSave = () => {
    setEditingNote(null);
    setLoading(true);
    setError(null);

    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/notes');
        setNotesList(response.data);
      } catch (error) {
        setError(error.message);
      } finally{
        setLoading(false);
      }
    };
    fetchNotes();
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
    <div>
      <div className='flex items-start ml-5'>
        <ButtonHome />
      </div>
      <div className='grid grid-cols-1 2xl:grid-cols-2 gap-5 sm:flex flex-wrap mt-20'>
      <div className='2xl:col-span-1'>
      {
          noteList.map(note =>(
          <NotesItem 
          key={note.id}
          note={note}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onActive={handleActive}
          onNoteClick = {handleNoteClick}
          />
        ))
          }
      </div>
      <div className='ml-[15px] 2xl:col-span-1'>
      {
        editingNote ? (
          <Form note={editingNote} onSave={handleSave}/>
        ) : (
          <Form onSave={handleSave}/>
        )
      }
      </div>
      </div>
      {
        selectedNote && (
          <Modal 
          openModal={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          note={selectedNote}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onActive={handleActive}
          />
        )
      }
    </div>
  )
}

export default NotesList