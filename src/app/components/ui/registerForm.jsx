import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import validator from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const dataInitialState = {
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
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
        },
        profession: {
            isRequired: {
                message: "Выбор профессии обязателен"
            }
        },
        licence: {
            isRequired: {
                message: "_"
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
        console.log(data);
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
            {professions && (
                <SelectField
                    label="Укажите свою профессию"
                    options={professions}
                    defaultOption="Выбрать..."
                    name="profession"
                    value={data.profession}
                    onChange={handleChange}
                    error={errors.profession}
                />
            )}
            <RadioField
                label="Укажите свой пол"
                options={[
                    { name: "Мужской", value: "male" },
                    { name: "Женский", value: "female" },
                    { name: "Другой", value: "other" }
                ]}
                name="sex"
                value={data.sex}
                onChange={handleChange}
            />
            {qualities && (
                <MultiSelectField
                    options={qualities}
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    name="qualities"
                    label="Выберите Ваши качества"
                />
            )}
            <CheckBoxField
                name="licence"
                value={data.licence}
                onChange={handleChange}
                error={errors.licence}
            >
                Соглашаюсь с условиями <a>Лицензионного соглашения</a>
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

export default RegisterForm;
