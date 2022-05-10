import { create } from 'apisauce';

const api = create({
    baseURL: "http://192.168.1.99:8080/api/",
});

export default api;