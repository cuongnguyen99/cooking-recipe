import api from "./baseApi";
import user from "./user";

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

const saveFood = (post, username, accessToken) => {
    const data = JSON.stringify(post);
    return api.post(
        "post/save?username=" + username, 
        data, 
        {headers: {
            Authorization: "Bearer "+ accessToken
        }}
    );
}

const saveResources = (resources, postID, accessToken) => {
    const data = JSON.stringify(resources);
    return api.post(
        "post/saveresource?postID=" + postID,
        data,
        {headers: {
            Authorization: "Bearer "+ accessToken
        }}
    );

};

const saveSteps = (steps, postID, accessToken) => {
    const data = JSON.stringify(steps);
    return api.post(
        "post/savestep?postID=" + postID,
        data,
        {headers: {
            Authorization: "Bearer "+ accessToken
        }}
    );

};

const saveImages = (images, postID, accessToken) => {
    const data = JSON.stringify(images);
    return api.post(
        "post/saveimage?postID=" + postID,
        data,
        {headers: {
            Authorization: "Bearer "+ accessToken
        }}
    );
};

const updatePost = (post, accessToken, onUploadProgress) => {
    return api.put(
        "post/update",
        post, 
        {
            headers: {Authorization: "Bearer "+accessToken},
            onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)
        }
    );
}

const acceptPost = (post, accessToken) => {
    return api.put("post/update",
    post, 
    {
        headers: {Authorization: "Bearer "+accessToken}
    })
}

const getPostNotAccept = (accessToken) => {
    return api.get("post/accept", {}, {headers: {Authorization: "Bearer "+accessToken}});
}

const deletePost = (postID, accessToken, onUploadProgress) => {
    console.log(postID);
    return api.any({method: "DELETE", url: "post/delete/"+postID, params: {}, 
        headers: {Authorization: "Bearer "+accessToken},
        onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)
    })
}


export default {getFoodByID, getFoodByCategory, getFoodByName, getNewFood, saveFood, saveResources, saveSteps, saveImages, updatePost, getPostNotAccept, deletePost, acceptPost};


