import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const itemsArray = (typeof items === "object") ? Object.values(items) : items;
    return (
        <ul className="list-group">
            {itemsArray.map((item) => (
                <li
                    key={item[valueProperty]}
                    className={
                        "list-group-item" +
                        (selectedItem === item ? " active" : "")
                    }
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectedItem: PropTypes.object,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func
};

export default GroupList;
