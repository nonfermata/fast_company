import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ count, pageSize, pageChange, currentPage }) => {
    const pagesCount = Math.ceil(count / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav
            style={{
                margin: "0 auto",
                width: "fit-content",
                cursor: "pointer"
            }}
        >
            <ul className="pagination">
                {pages.map((number) => (
                    <li
                        key={"page_" + number}
                        className={
                            "page-item " +
                            (currentPage === number ? "active" : "")
                        }
                    >
                        <div
                            className="page-link"
                            onClick={() => pageChange(number)}
                        >
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    count: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
