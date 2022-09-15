import React from 'react'

const Quality = ({_id, name, color}) => {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    )
}

export default Quality
