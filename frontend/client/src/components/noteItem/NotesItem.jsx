import React from 'react'

const NotesItem = ({note, onEdit, onDelete, onArchive, onActive, onNoteClick}) => {
 

  return (
    <div>
      <div onClick={() => onNoteClick(note)} className='font-pop font-semibold cursor-pointer hover:text-rose-600 truncate text-center max-w-xs mx-auto'>
        {note.title}
      </div>
           
    </div>
  )
}

export default NotesItem