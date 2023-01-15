const generateAuthError = (message) => {
    switch (message) {
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует!";
        case "INVALID_PASSWORD" || "EMAIL_NOT_FOUND":
            return "Неверная пара e-mail – пароль!";
        default:
            return "Слишком много попыток входа! Побробуйте позднее.";
    }
};

export default generateAuthError;
