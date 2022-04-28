import api from "./baseApi";

const endpoint = "categories";

const getCategory = () => {
    return api.get(endpoint);
}

export default {getCategory};