import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, onChange, value, children, error }) => {
    const handleChange = ({ target }) => {
        onChange(name, target.checked);
    };
    // const getSelectClasses = () => {
    //     return "form-check-input" + (error ? " is-invalid" : "");
    // };
    return (
        <div className="form-check mb-4">
            <input
                // name={name}
                // className={getSelectClasses()}
                className="form-check-input"
                type="checkbox"
                checked={value}
                id={name}
                onChange={handleChange}
            />
            <label
                className="form-check-label"
                htmlFor={name}
            >
                {children}
            </label>
            {/* {error && <div className="invalid-feedback">{error}</div>} */}
        </div>
    );
};
CheckBoxField.propTypes = {
    value: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    name: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};

export default CheckBoxField;
