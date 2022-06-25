package com.example.backend.Service;

import com.example.backend.Entity.*;
import com.example.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final ResourceRepository resourceRepository;
    private final StepRepository stepRepository;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;
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

    public ArrayList<Post> getPostByUsername(String username) {
        return postRepository.findPostByUsername(username);
    }

    public int savePost(Post post, String username) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern(("yyyy/MM/dd HH:mm:ss"));
        LocalDateTime now = LocalDateTime.now();

        User user = userRepository.findByUsername(username);
        post.setUsername(user);
        post.setTime(dtf.format(now));
        postRepository.save(post);
        return post.getId();
    }

    public ArrayList<Image> addImageToPost(ArrayList<Image> images, int postID) {
        Post post = postRepository.findById(postID);
        for (Image image: images) {
            post.getImages().add(image);
        }
        return images;
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

    public void removePost(int id) {
        Post post = postRepository.findById(id);
        log.info("Delete post!");
        post.setUsername(null);
        postRepository.delete(post);
    }

    public Post updatePost(Post post) {
        log.info("Save Post");
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern(("yyyy/MM/dd HH:mm:ss"));
        LocalDateTime now = LocalDateTime.now();
        post.setTime(dtf.format(now));
        postRepository.save(post);
        return post;
    }

    public Post saveNewPost(Post post, String username) {
        User user = userRepository.findByUsername(username);
        post.setUsername(user);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern(("yyyy/MM/dd HH:mm:ss"));
        LocalDateTime now = LocalDateTime.now();
        post.setTime(dtf.format(now));
        return postRepository.save(post);
    }

    public ArrayList<Post> getPostRandom(int categoryID) {
        return postRepository.findPostRandom(categoryID);
    }

    public ArrayList findPostNotAccepted() {
        return postRepository.findPostNotAccepted();
    }
}
