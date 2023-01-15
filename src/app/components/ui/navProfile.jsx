import React, { useState } from "react";
import Avatar from "./avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../../store/users";
import Loader from "../../utils/loader";

const NavProfile = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const currentUser = useSelector(getUserById(currentUserId));

    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (!currentUser) {
        return <Loader />;
    }
    return (
        <div
            className="dropdown"
            onClick={toggleMenu}
        >
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <Avatar
                    width="40"
                    height="40"
                    image={currentUser.image}
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link
                    className="dropdown-item"
                    to={`/users/${currentUserId}`}
                >
                    Profile
                </Link>
                <Link
                    className="dropdown-item"
                    to="/logout"
                >
                    Log out
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
