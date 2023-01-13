import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import validator from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQualities } from "../../../store/qualities";
import { getProfessions } from "../../../store/professions";

const RegisterForm = () => {
    const history = useHistory();
    const professions = useSelector(getProfessions());
    const qualities = useSelector(getQualities());
    const { signUp } = useAuth();
    const dataInitialState = {
        name: "",
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
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                value: 3,
                message: "Имя должно состоять минимум из 3-х символов"
            }
        },

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (e) {
            setErrors(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="name"
                value={data.name}
                error={errors.name}
                onChange={handleChange}
                label="Имя"
            />
            <TextField
                name="email"
                value={data.email}
                error={errors.email}
                onChange={handleChange}
                label="E-mail"
            />
            <TextField
                name="password"
                value={data.password}
                error={errors.password}
                onChange={handleChange}
                label="Пароль"
                type="password"
            />
            {professions && (
                <SelectField
                    name="profession"
                    value={data.profession}
                    error={errors.profession}
                    onChange={handleChange}
                    options={professions}
                    defaultOption="Выбрать..."
                    label="Укажите свою профессию"
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
