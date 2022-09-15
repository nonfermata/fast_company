import React from 'react'

const DeleteButton = ({id, onDelete}) => {
    return (
        <button className='btn btn-danger' onClick={() => onDelete(id)}>
            delete
        </button>
    )
}

export default DeleteButton
