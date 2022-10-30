import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    options,
    defaultOption,
    name,
    value,
    onChange,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange(name, target.value);
    };
    const getSelectClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray =
        typeof options === "object" ? Object.values(options) : options;
    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="form-label"
            >
                {label}
            </label>
            <select
                // name={name}
                className={getSelectClasses()}
                id={name}
                onChange={handleChange}
                value={value}
            >
                <option
                    disabled
                    value=""
                >
                    {defaultOption}
                </option>
                {optionsArray.map((option) => (
                    <option
                        key={option._id}
                        value={option._id}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    defaultOption: PropTypes.string,
    onChange: PropTypes.func
};

export default SelectField;
