import api from "./baseApi";

const endpoint = "posts/";

const getFoodByID = (foodID) => {
    return api.get(endpoint + "detail/" + foodID);
}

const getFoodByCategory = (categoryID) => {
    return api.get(endpoint + categoryID);
}

export default {getFoodByID, getFoodByCategory};


