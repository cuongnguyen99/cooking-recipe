package com.example.backend.Controller;

import com.example.backend.Entity.Image;
import com.example.backend.Entity.Post;
import com.example.backend.Entity.Resource;
import com.example.backend.Entity.Step;
import com.example.backend.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/posts/{category_id}")
    public ArrayList<Post> getPostByCategoryID(@PathVariable(name = "category_id") int id) {
        return postService.getPostsByCategory(id);
    }

    @GetMapping("/detail/{post_id}")
    public Post getPostByID(@PathVariable(name = "post_id") int id) {
        return postService.getPostByID(id);
    }

    @GetMapping("/posts")
    public ResponseEntity<ArrayList<Post>> getPostByUsername(@RequestParam String username) {
        return ResponseEntity.ok().body(postService.getPostByUsername(username));
    }

    @GetMapping("/post/new")
    public ResponseEntity<List<Post>> getNewPost() {
        return ResponseEntity.ok().body(postService.getPostByTime());
    }

    @GetMapping("/post/search")
    public ArrayList<Post> getPostByName(@RequestParam String name) {
        return postService.getPostByName(name);
    }

    @PostMapping("post/save")
    public ResponseEntity<?> savePost(@RequestBody Post post, @RequestParam String username) {
        return ResponseEntity.ok().body(postService.savePost(post, username));
    }

    @PostMapping("post/saveresource")
    public ResponseEntity<ArrayList<Resource>> saveResource(@RequestBody ArrayList<Resource> resources, @RequestParam int postID) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post/saveresource").toUriString());

        return ResponseEntity.created(uri).body(postService.addResourceToPost(resources, postID));
    }

    @PostMapping("post/savestep")
    public ResponseEntity<ArrayList<Step>> saveStep(@RequestBody ArrayList<Step> steps, @RequestParam int postID) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post/savestep").toUriString());

        return ResponseEntity.created(uri).body(postService.addStepToPost(steps, postID));
    }
    @PostMapping("post/saveimage")
    public ResponseEntity<ArrayList<Image>> saveImage(@RequestBody ArrayList<Image> images, @RequestParam int postID) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post/saveimage").toUriString());

        return ResponseEntity.created(uri).body(postService.addImageToPost(images, postID));
    }

    @PutMapping("post/update")
    public ResponseEntity<Post> updatePost(@RequestBody Post post) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post/update").toUriString());

        return ResponseEntity.created(uri).body(postService.updatePost(post));
    }

    @DeleteMapping("post/delete")
    public ResponseEntity<Post> deletePost(@RequestBody Post post) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post/delete").toUriString());
        postService.removePost(post);
        return ResponseEntity.ok().build();
    }

}
