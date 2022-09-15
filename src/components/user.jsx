import React from 'react'
import Quality from "./quality"
import Bookmark from "./bookmark"
import DeleteButton from "./deleteButton";

const User = ({ _id, name, qualities, profession, completedMeetings, rate, bookmark, onDelete, onMark }) => {

    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map(item => <Quality key={item._id} {...item} />)}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate + "/5"}</td>
            <td>
                <Bookmark id={_id} bookmark={bookmark} onMark={onMark} />
            </td>
            <td>
                <DeleteButton id={_id} onDelete={onDelete}/>
            </td>
        </tr>
    )
}

export default User
