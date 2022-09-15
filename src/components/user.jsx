import React, {useState} from 'react'
import Quality from "./quality"
import Bookmarks from "./bookmarks"

const User = ({_id, name, qualities, profession, completedMeetings, rate, bookmark, onDelete}) => {
    const [mark, setMark] = useState(bookmark)
    const handleMark = () => setMark(!mark)

    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map(item => <Quality key={item._id} {...item}/>)}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate + "/5"}</td>
            <td>
                <Bookmarks mark={mark} onMark={handleMark}/>
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => onDelete(_id)}>
                    delete
                </button>
            </td>
        </tr>
    )
}

export default User
