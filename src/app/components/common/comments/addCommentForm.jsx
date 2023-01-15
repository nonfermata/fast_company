import React, { useEffect, useState } from "react";
import Textarea from "../form/textarea";
import validator from "../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Вы не можете опубликовать пустой комментарий"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>New comment</h2>
            <Textarea
                name="content"
                value={data.content || ""}
                error={errors.content}
                onChange={handleChange}
                label="Комментарий"
                rows="3"
            />
            <div className="d-flex justify-content-end">
                <button
                    disabled={!isValid || !data.content}
                    className="btn btn-primary"
                >
                    Опубликовать
                </button>
            </div>
        </form>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
