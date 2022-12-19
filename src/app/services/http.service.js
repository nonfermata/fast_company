/* eslint-disable indent */
import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await httpAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(response) {
    return response && !response._id
        ? Object.keys(response).map((key) => ({
              ...response[key]
          }))
        : response;
}

http.interceptors.response.use(
    function (response) {
        if (configFile.isFireBase) {
            response.data = { content: transformData(response.data) };
        }
        return response;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Something is wrong... Try later.");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete
};

export default httpService;
