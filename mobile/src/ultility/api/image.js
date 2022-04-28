import api from "./baseApi";

const endpoint = "images/";

const getImagesByPostID = (postID) => {
    return api.get(endpoint + postID);
}

export default {getImagesByPostID};