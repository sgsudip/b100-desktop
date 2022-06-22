import axios from "axios"
import { url } from "../constants/urls";

const getAuth = async () => {
    const auth = await localStorage.getItem("auth");
    if (auth !== null) {
        return auth;
    }
    return "none";
};

export const apiCall = async (method, path, body, params, headers) => {

    let auth = await getAuth();

    let headerParams = {
        crossorigin: true,
        authorization: auth,
    }

    if (headers) headerParams = { ...headerParams, ...headers }

    let reqObj = {
        method: method,
        url: url(path),
        headers: headerParams,
        data: body ? body : {},
        params: params ? params : {},
    }

    let response = await axios(reqObj).catch(error => {
        console.log("ERROR", error)
    })

    return response && response.data ? response.data : {}
}