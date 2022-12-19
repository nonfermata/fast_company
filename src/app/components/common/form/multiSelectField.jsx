/* eslint-disable indent */
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, options, onChange, name, defaultValue }) => {
    const handleChange = (e) => {
        onChange(name, e);
    };
    const optionsArray =
        typeof options === "object"
            ? Object.keys(options).map((key) => ({
                  value: options[key]._id,
                  label: options[key].name
              }))
            : options.map((option) => ({
                  value: option._id,
                  label: option.name
              }));
    return (
        <div className="mb-4">
            <label
                htmlFor="validationCustom04"
                className="form-label"
            >
                {label}
            </label>
            <Select
                isMulti
                defaultValue={defaultValue}
                closeMenuOnSelect={false}
                options={optionsArray}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
};

export default MultiSelectField;
