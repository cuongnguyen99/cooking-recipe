import api from "./baseApi";
import qs from "qs";

const login = (username, password) => {
    let data = qs.stringify({
        'username': username,
        'password': password
    });

    return api.post(
        "login", 
        data,
        {headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

const signup = (username, password, fullname, onUploadProgress) => {
    let data = JSON.stringify({
        "username": username,
        "password": password,
        "fullname": fullname,
        "image_url": "https://www.seekpng.com/png/detail/46-462910_person-icon-black-avatar-png.png"
    });

    return api.post(
        "user/save",
        data,
        {
            headers: {
            "Content-Type": "application/json"
            },
            onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)
        }
    );
} 

const getUser = (username, access_token) => {
    return api.get("user/infor?username=" + username, {}, {headers: {Authorization: "Bearer " + access_token}});
}

const addFavorite = (username, postID, access_token) => {
    return api.post("user/addfavorite?username="+ username + "&postID=" +postID, {}, {
        headers: {Authorization: "Bearer "+ access_token}
    });
}

const removeFavorite = (username, postID, access_token) => {
    return api.delete("user/removefavorite?username="+ username + "&postID=" +postID, {}, {
        headers: {Authorization: "Bearer "+ access_token}
    });
}

export default {login, signup, getUser, addFavorite, removeFavorite};