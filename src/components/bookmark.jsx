import React from 'react'

const Bookmark = ({id, bookmark, onMark}) => {
    const bookmarkClass = bookmark === true ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'
    return (
        <i className={bookmarkClass} onClick={() => onMark(id)} style={{cursor: 'pointer'}}>
        </i>
    )
}

export default Bookmark
