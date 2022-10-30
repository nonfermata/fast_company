import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, options, name, onChange, value }) => {
    const handleChange = ({ target }) => {
        onChange(name, target.value);
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div></div>
            {options.map((option) => (
                <div
                    key={option.name + "_" + option.value}
                    className="form-check form-check-inline"
                >
                    <input
                        // name={name}
                        className="form-check-input"
                        type="radio"
                        checked={option.value === value}
                        id={option.name + "_" + option.value}
                        value={option.value}
                        onChange={handleChange}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={option.name + "_" + option.value}
                    >
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};
RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default RadioField;
