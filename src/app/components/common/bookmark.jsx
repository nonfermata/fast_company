import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, bookmark, onToggleBookMark }) => {
    const bookmarkClass = bookmark ? "bi bi-bookmark-fill" : "bi bi-bookmark";
    return (
        <i
            className={bookmarkClass}
            onClick={() => onToggleBookMark(id)}
            style={{ cursor: "pointer" }}
        ></i>
    );
};
Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default Bookmark;
