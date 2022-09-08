import React, { useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.css'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const numberOfUsers = users.length
    console.log(users)

    const getPhraseClasses = number => {
        let classes = "badge "
        classes += number !== 0 ? "bg-primary" : "bg-danger"
        return classes
    }

    const renderPhrase = number => {
        if (number === 0) return `Никто с тобой не тусанет`
        let word = 'человек'
        if ((number % 10 === 2 ||
            number % 10 === 3 ||
            number % 10 === 4) &&
            // checking for "12", "13", "14" at the end
            Math.floor(number / 10 % 10) !== 1) {
            word = 'человека'
        }
        return `${number} ${word} тусанет с тобой сегодня`
    }

    const getQualitiesList = qualities => {
        return qualities.map(quality =>
            <span
                key={quality._id}
                className={"badge m-1 bg-" + quality.color}
            >
                {quality.name}
            </span>)
    }

    const handleDelete = id => {
        setUsers(users => users.filter(user => user._id !== id))
    }

    const getUsersList = () => {
        return users.map(user =>
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{getQualitiesList(user.qualities)}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate + "/5"}</td>
                <td>
                    <button
                        className='btn btn-danger'
                        onClick={() => handleDelete(user._id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        )
    }

    const getTable = number => {
        return number !== 0
            ? <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {getUsersList()}
                </tbody>
            </table>
            : ''
    }

    return (
        <>
            <h3>
                <span className={getPhraseClasses(numberOfUsers)}>
                    {renderPhrase(numberOfUsers)}
                </span>
            </h3>
            {getTable(numberOfUsers)}
        </>
    )
}

export default Users