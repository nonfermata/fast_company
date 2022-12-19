import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "../avatar";
import { useAuth } from "../../../hooks/useAuth";

const UserCard = ({ id, name, profession, rate, image }) => {
    const { currentUser } = useAuth();
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === id && (
                    <Link to={"/users/" + id + "/edit"}>
                        <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                            <i className="bi bi-gear"></i>
                        </button>
                    </Link>
                )}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <Avatar
                        image={image}
                        width="150"
                        height="150"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession}</p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.number,
    image: PropTypes.string
};

export default UserCard;
