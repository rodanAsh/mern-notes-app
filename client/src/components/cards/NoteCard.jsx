import React from 'react'
import moment from 'moment'
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
  }) => {
    
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-slate-500'>{moment(date).format("DD MMM YYYY")}</span>
            </div>
            
            <MdOutlinePushPin 
                className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`}
                onClick={onPinNote}
            />
        </div>

        <p>{content?.slice(0, 60)}</p>

        <div className=''>
            <div className='text-xs text-slate-500'>{tags.map((item,ined) => `#${item} `)}</div>

            <div className='flex gap-2 justify-end'>
                <MdCreate
                    onClick={onEdit}
                    className='icon-btn hover:text-green-600'
                />
                <MdDelete
                    onClick={onDelete}
                    className='icon-btn hover:text-red-500'
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard