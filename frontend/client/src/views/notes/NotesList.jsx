import React,{useState, useEffect} from 'react'
import axios from 'axios'
import NotesItem from '../../components/noteItem/NotesItem';
import Form from '../../components/form/Form';

const NotesList = () => {
  const [noteList, setNotesList]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

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

      const updateNoteList = noteList.map(n => n.id === id ? {...n, archive: !n.archive} : n)
      setNotesList(updateNoteList)

      await axios.put(`http://localhost:4000/notes/${id}`,{title, message, archive: !note.archive})
    } catch (error) {
      setError(error.message);
    }
  }

  const handleActive = async (id) => {
    try {
      const note = noteList.find(note => note.id === id);

      const {title, message, archive} = note;

      const activeNotes = noteList.map(n => n.id === id ? {...n, active: !n.active} : n)
      setNotesList(activeNotes);

      await axios.put(`http://localhost:4000/notes/${id}`,{title, message, archive, active: !note.active})
    } catch (error) {
      setError(error.message);
    }
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
          />
        ))
          }
      </div>
      <div className='ml-[15px] 2xl:col-span-1'>
      {
        editingNote ? (
          <Form note={editingNote} onSave={handleSave} onCancel={() => setEditingNote(null)}/>
        ) : (
          <Form onSave={handleSave}/>
        )
      }
      </div>
      </div>
    </div>
  )
}

export default NotesList