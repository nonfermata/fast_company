import React from 'react'

const Quality = ({name, color, _id}) => {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    )
}

export default Quality
