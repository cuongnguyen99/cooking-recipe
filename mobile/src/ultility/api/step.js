import api from "./baseApi";

const endpoint = "steps/";

const getStepByPostID = (postID) => {
    return api.get(endpoint + postID);
}

export default {getStepByPostID};