/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import validator from "../../../utils/validator";
import Loader from "../../../utils/loader";
import { useHistory } from "react-router-dom";
import BackButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfessions";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const EditUser = () => {
    const { currentUser: user, updateUser } = useAuth();
    const { professions, isLoading: isLoadingProfessions } = useProfessions();
    const { qualities, isLoading: isLoadingQualities } = useQualities();
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const userQualities = !isLoadingQualities
            ? user.qualities
                  .map((item) => qualities.find((q) => q._id === item))
                  .map((item) => ({ label: item.name, value: item._id }))
            : [];
        setData({ ...user, qualities: userQualities });
    }, [isLoadingQualities]);

    const history = useHistory();

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "E-mail обязателен для заполнения"
            },
            isEmail: {
                message: "Некорректный e-mail"
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

    const handleChange = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;
        const newUser = {
            ...data,
            qualities: data.qualities.map((item) => item.value)
        };
        updateUser(newUser);
        history.push(`/users/${user._id}`);
    };
    if (data && !isLoadingProfessions && !isLoadingQualities) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="flex-row justify-content-start">
                        <BackButton />
                    </div>
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="E-mail"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Укажите профессию"
                                options={professions}
                                defaultOption="Выбрать..."
                                name="profession"
                                value={data.profession}
                                onChange={handleChange}
                                error={errors.profession}
                            />
                            <RadioField
                                label="Укажите пол"
                                options={[
                                    { name: "Мужской", value: "male" },
                                    { name: "Женский", value: "female" },
                                    { name: "Другой", value: "other" }
                                ]}
                                name="sex"
                                value={data.sex}
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите качества"
                            />
                            <button
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};

export default EditUser;
