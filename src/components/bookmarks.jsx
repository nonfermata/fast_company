import React from 'react'

const Bookmarks = ({mark, onMark}) => {
    return mark === true
        ? <i className="bi bi-bookmark-fill" onClick={onMark} style={{cursor:'pointer'}}></i>
        : <i className="bi bi-bookmark" onClick={onMark} style={{cursor:'pointer'}}></i>
}

export default Bookmarks
