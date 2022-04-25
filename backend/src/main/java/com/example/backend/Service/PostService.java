package com.example.backend.Service;

import com.example.backend.Entity.Post;
import com.example.backend.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public ArrayList<Post> getPostsByCategory(int category_id) {
        return postRepository.findPostByCategoryID(category_id);
    }

    public Post getPostByID(int id) {
        return postRepository.findById(id);
    }
}
