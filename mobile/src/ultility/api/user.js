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

export default {login, signup};