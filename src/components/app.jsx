import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import SearchStatus from "./searchStatus"
import Users from "./users"
import api from "../api"

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleMark = id => {
        setUsers(users => users.map(user => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
            }
            return user
        }))
    }

    const handleDelete = id => {
        setUsers(users => users.filter(user => user._id !== id))
    }

    return (
        <>
            <SearchStatus length={users.length} />
            <Users users={users} onMark={handleMark} onDelete={handleDelete} />
        </>
    )
}

export default App
