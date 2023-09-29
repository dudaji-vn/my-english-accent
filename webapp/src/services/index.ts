import axios from 'axios';
import ManagerData from '../shared/utils/manageData.util';

const httpClient = axios.create({
    baseURL: 'https://sp-volunteer-api.herokuapp.com/',
    timeout: 30000,
    headers: {
        Content: 'application/json',
        Accept: 'application/json',
    },
    withCredentials: false,
});

httpClient.interceptors.request.use((request: any) => {
    try {
        const token = ManagerData.getToken();
        if (token) request.headers['Authorization'] = `Bearer ${token}`;
        // console.log('request.header:', BASE_URL);
        return request;
    } catch (e) {
        console.log('request.header:error', e);
    }
});
httpClient.interceptors.response.use(
    response => {
        if (response && response.data) return response.data;
        return response;
    },
    error => {
        throw error;
    },
);

export const getParams = (_params: any) => {
    if (_params) {
        const params = Object.assign(_params, {});
        for (const key in params) {
            if (!params[key]) {
                delete params[key];
            }
        }
    }
    return _params;
};

export default httpClient;
