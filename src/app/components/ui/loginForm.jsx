import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import validator from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
    const history = useHistory();
    const { signIn } = useAuth();
    const initialState = {
        email: "",
        password: "",
        stayOn: false
    };
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const handleChange = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setEnterError(null);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "E-mail обязателен для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        try {
            await signIn(data);
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (e) {
            setEnterError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="E-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                disabled={!isValid || enterError}
                className="btn btn-primary w-100 mx-auto"
            >
                Войти
            </button>
        </form>
    );
};

export default LoginForm;
