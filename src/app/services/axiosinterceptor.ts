import axios from "axios";

const APIService = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    paramsSerializer: {indexes: null}
});
axios.defaults.withCredentials = true;
APIService.defaults.withCredentials = true;

APIService.interceptors.request.use(config => {
    console.log("REQUEST INTERCEPTED");
    if (config.method === "post") {
        config.withCredentials = true;
        return config;
    }
    return config;
});

APIService.interceptors.response.use(
    response => {
        // console.log("RESPONSE INTERCEPTED");
        return response;
    },
    error => {
        const originalRequest = error.config;
        if (error.response === undefined) {
            // console.log("ERROR UNDEFINED: " + error.response);
            return error;
        }
        const errorStatus = error.response.status;

        console.log(errorStatus);

        if (errorStatus === 400) {
            return Promise.reject(error);
        }

        if (errorStatus === 401 && !originalRequest._retry && error.response.config.url !== "auth/login") {
            originalRequest._retry = true;
            axios.defaults.withCredentials = true;
            APIService.defaults.withCredentials = true;

            return axios
                .post(APIService.defaults.baseURL + "/auth/access-token", {}, {
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log("ACCESS REFRESHED");
                        return APIService(originalRequest);
                    }
                })
                .catch((error) => {
                    // console.log("ERROR REFRESHING ACCESS TOKEN");
                    // console.log(error.response.data);
                    // console.log(error.response);
                    if(error.response !== undefined) {
                        if (error.response.data === "Missing refresh token") {
                            // console.error("MISSING REFRESH TOKEN");
                            // notification("Your session has expired.", "Please login again.", "red", 6000);
                            Promise.reject(error);
                        }
                    }
                    return;
                });

        }
        return Promise.reject(error);
    }
);

export default APIService;