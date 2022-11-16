import React, { useEffect, useState } from "react";
import SelectField from "../../common/form/selectField";
import Textarea from "../../common/form/textarea";
import api from "../../../api";
import Loader from "../../../utils/loader";
import validator from "../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentForm = ({ userId, updateCommentsList }) => {
    const dataInitialState = {
        userId: "",
        content: "",
        pageId: userId
    };
    const [data, setData] = useState(dataInitialState);
    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выбор автора обязателен"
            }
        },
        content: {
            isRequired: {
                message: "Вы не можете опубликовать пустой комментарий"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;
        api.comments.add(data).then();
        updateCommentsList();
        setData(dataInitialState);
    };

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users
            .fetchAll()
            .then((data) =>
                setUsers(
                    data.map((user) => ({ name: user.name, _id: user._id }))
                )
            );
    }, []);
    if (users) {
        return (
            <form onSubmit={handleSubmit}>
                <h2>New comment</h2>
                {users && (
                    <SelectField
                        name="userId"
                        value={data.userId}
                        error={errors.userId}
                        onChange={handleChange}
                        options={users}
                        defaultOption="Выберите автора комментария"
                    />
                )}
                <Textarea
                    name="content"
                    value={data.content}
                    error={errors.content}
                    onChange={handleChange}
                    label="Комментарий"
                    rows="3"
                />
                <div className="d-flex justify-content-end">
                    <button
                        disabled={!isValid}
                        className="btn btn-primary"
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        );
    }
    return <Loader />;
};
AddCommentForm.propTypes = {
    userId: PropTypes.string,
    updateCommentsList: PropTypes.func
};

export default AddCommentForm;
