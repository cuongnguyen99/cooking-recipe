package com.example.backend.Controller;

import com.example.backend.Entity.Post;
import com.example.backend.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/{category_id}")
    public ArrayList<Post> getPostByCategoryID(@PathVariable(name = "category_id") int id) {
        return postService.getPostsByCategory(id);
    }

    @GetMapping("/detail/{post_id}")
    public Post getPostByID(@PathVariable(name = "post_id") int id) {
        return postService.getPostByID(id);
    }
}
