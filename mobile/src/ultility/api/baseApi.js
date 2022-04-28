import { create } from 'apisauce';

const api = create({
    baseURL: "http://192.168.232.198:8080/api/",
});

export default api;