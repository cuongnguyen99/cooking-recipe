import api from "./baseApi";

const endpoint = "resources/";

const getResourceByPostID = (postID) => {
    return api.get(endpoint + postID);
}

export default {getResourceByPostID};