import axios from "axios";
import { parseCookies } from "nookies";

export const getAPIClient = (ctx?: any) => {

    const api = axios.create({ baseURL: 'http://localhost:3333' });

    const { 'fakeatm.token': token } = parseCookies(ctx);

    //interceptação para q em cada requisição q passa pelo axios faça isso
    api.interceptors.request.use(config => {
        console.log(config);
        return config;
    });

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return api;
}