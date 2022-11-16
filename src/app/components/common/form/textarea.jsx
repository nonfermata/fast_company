import React from "react";
import PropTypes from "prop-types";

const Textarea = ({ rows, label, name, onChange, error, value }) => {
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        onChange(name, target.value);
    };
    return (
        <div className="mb-4">
            <label
                htmlFor="comment"
                className="form-label"
            >
                {label}
            </label>
            <textarea
                // name={name}
                className={getInputClasses()}
                id={name}
                value={value}
                rows={rows}
                onChange={handleChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
Textarea.propTypes = {
    rows: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default Textarea;
