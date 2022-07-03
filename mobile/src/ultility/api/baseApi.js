import { create } from 'apisauce';
import cache from '../cache';

const api = create({
    // baseURL: "http://192.168.1.236:8080/api/",
    baseURL: "https://cooking-recipe-springboot.herokuapp.com/api/",
});

const get = api.get;
api.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);

    if(response.ok) {
        cache.store(url, response.data);
        return response;
    }

    const data = await cache.get(url);
    return data ? {ok: true, data} : response;
}

export default api;