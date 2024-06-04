import React, {useState} from 'react'

const NotesItem = ({note, onEdit, onDelete, onArchive, onActive}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleEdit = () => onEdit(note);
  const handleDelete = () => onDelete(note.id);
  const handleArchive = () => onArchive(note.id);
  const handleActive = () => onActive(note.id);
  return (
    <div>
      <div onClick={toggleOpen} className='font-pop font-semibold cursor-pointer hover:text-rose-600'>
        {note.title}
      </div>
      {
        isOpen && (
         <div>
          <div className='block'>
            <p className='font-pop'>{note.message}</p>
          </div>
          <div className='flex flex-wrap justify-center mt-2'>
          <button className='rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3' onClick={handleEdit}>Edit</button>
          <button className='rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3' onClick={handleDelete}>Delete</button>
          <button className='rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3' onClick={handleActive}>
          {
            note.active ? 'Inactive' : 'Active'
          }
        </button>
        <button className='rounded-lg border-2 border-solid border-rose-600 font-pop font-semibold hover:bg-rose-400 hover:text-white p-1 mr-3' onClick={handleArchive}>
          {note.archive ? 'Unarchive' : 'Archive'}
        </button>
          </div>
         </div>
        )
      }
    </div>
  )
}

export default NotesItem