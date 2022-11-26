import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import api from "../../../api";
import validator from "../../../utils/validator";
import PropTypes from "prop-types";
import Loader from "../../../utils/loader";
import { useHistory } from "react-router-dom";
import BackButton from "../../common/backButton";

const EditUser = ({ userId }) => {
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((user) =>
            setData({
                name: user.name,
                email: user.email,
                profession: user.profession._id,
                sex: user.sex,
                qualities: user.qualities.map((item) => ({
                    value: item._id,
                    label: item.name
                }))
            })
        );
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

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
            profession: {
                _id: data.profession,
                name: Object.values(professions).find(
                    (item) => item._id === data.profession
                ).name
            },
            qualities: data.qualities.map((item) => ({
                _id: item.value,
                name: item.label,
                color: Object.values(qualities).find(
                    (quality) => quality._id === item.value
                ).color
            }))
        };
        api.users.update(userId, newUser).then();
        history.push(`/users/${userId}`);
    };
    if (data) {
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
                            {professions && (
                                <SelectField
                                    label="Укажите профессию"
                                    options={professions}
                                    defaultOption="Выбрать..."
                                    name="profession"
                                    value={data.profession}
                                    onChange={handleChange}
                                    error={errors.profession}
                                />
                            )}
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
                            {qualities && (
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Выберите качества"
                                />
                            )}
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
EditUser.propTypes = {
    userId: PropTypes.string
};

export default EditUser;
