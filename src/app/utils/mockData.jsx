import { useEffect, useState } from "react";
import users from "../mockData/users.json";
import qualities from "../mockData/qualities.json";
import professions from "../mockData/professions.json";
import httpService from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaryCount = professions.length + qualities.length + users.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (newProgress > progress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            await professions.forEach((item) => {
                httpService.put("profession/" + item._id, item);
                incrementCount();
            });
            await users.forEach((item) => {
                httpService.put("user/" + item._id, item);
                incrementCount();
            });
            await qualities.forEach((item) => {
                httpService.put("quality/" + item._id, item);
                incrementCount();
            });
        } catch (e) {
            setError(e);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialize, progress, status };
};

export default useMockData;
