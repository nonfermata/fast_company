import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import validator from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
// import * as yup from "yup";

const LoginForm = () => {
    const history = useHistory();
    const { signIn } = useLogin();
    const initialState = {
        email: "",
        password: "",
        stayOn: false
    };
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});

    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required("Пароль обязателен для заполнения")
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             "Пароль должен содержать хотя бы одну заглавную букву"
    //         )
    //         .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одну цифру")
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             "Пароль должен содержать хотя бы один из специальных символов !@#$%^&*"
    //         )
    //         .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
    //     email: yup
    //         .string()
    //         .required("E-mail обязателен для заполнения")
    //         .email("Некорректный e-mail")
    // });

    const handleChange = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "E-mail обязателен для заполнения"
            },
            isEmail: {
                message: "Некорректный e-mail"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                value: 8,
                message: `Пароль должен состоять минимум из 8 символов`
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }));
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        try {
            await signIn(data);
            history.push("/");
        } catch (e) {
            setErrors(e);
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
            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Войти
            </button>
        </form>
    );
};

export default LoginForm;
