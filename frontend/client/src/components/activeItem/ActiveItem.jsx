import React from 'react'

const ActiveItem = ({note, onEdit, onDelete, onArchive, onActive, onNoteClick}) => {
  return (
    <div>
        <div onClick={() => onNoteClick(note)} className='font-pop font-semibold cursor-pointer hover:text-rose-600'>
            {note.title}
        </div>
    </div>
  )
}

export default ActiveItem