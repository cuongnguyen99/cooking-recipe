import api from "./baseApi";

const endpoint = "posts/";

const getFoodByID = (foodID) => {
    return api.get(endpoint + "detail/" + foodID);
}

const getFoodByCategory = (categoryID) => {
    return api.get("posts/" + categoryID);
}

const getFoodByName = (name) => {
    return api.get("post/search?name=" + name);
}

const getNewFood = () => {
    return api.get("post/new");
}

export default {getFoodByID, getFoodByCategory, getFoodByName, getNewFood};


