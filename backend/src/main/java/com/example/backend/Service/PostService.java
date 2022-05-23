package com.example.backend.Service;

import com.example.backend.Entity.Image;
import com.example.backend.Entity.Post;
import com.example.backend.Entity.Resource;
import com.example.backend.Entity.Step;
import com.example.backend.Repository.ImageRepository;
import com.example.backend.Repository.PostRepository;
import com.example.backend.Repository.ResourceRepository;
import com.example.backend.Repository.StepRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final ResourceRepository resourceRepository;
    private final StepRepository stepRepository;
    private final ImageRepository imageRepository;
    @Autowired
    private PostRepository postRepository;

    public ArrayList<Post> getPostsByCategory(int category_id) {
        return postRepository.findPostByCategoryID(category_id);
    }

    public Post getPostByID(int id) {
        return postRepository.findById(id);
    }

    public ArrayList<Post> getPostByName(String post_name) {
        return postRepository.findPostByName(post_name);
    }

    public ArrayList<Post> getPostByTime() {
        return postRepository.findPostByTime();
    }

    public Post savePost(Post post) {
        postRepository.save(post);
        return post;
    }

    public ArrayList<Resource> addResourceToPost(ArrayList<Resource> resources, int postID) {
        Post post = postRepository.findById(postID);
        for (Resource resource: resources) {
            post.getResources().add(resource);
        }
        return resources;
    }

    public ArrayList<Step> addStepToPost(ArrayList<Step> steps, int postID) {
        Post post = postRepository.findById(postID);
        for (Step step: steps) {
            post.getSteps().add(step);
        }
        return steps;
    }

    public ArrayList<Image> addImageToPost(ArrayList<Image> images, int postID) {
        Post post = postRepository.findById(postID);
        for (Image image: images) {
            post.getImages().add(image);
        }
        return images;
    }
}
