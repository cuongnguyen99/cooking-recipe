package com.example.backend;

import com.example.backend.Entity.Category;
import com.example.backend.Entity.Image;
import com.example.backend.Entity.Post;
import com.example.backend.Entity.User;
import com.example.backend.Repository.CategoryRepository;
import com.example.backend.Repository.ImageRepository;
import com.example.backend.Repository.PostRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.ArrayList;

@SpringBootApplication
@RequiredArgsConstructor
public class App {
    public static void main(String args[]) {
        ApplicationContext context = SpringApplication.run(App.class, args);

//        PostRepository postRepository = context.getBean(PostRepository.class);
//        ArrayList<Post> posts = postRepository.findPostByCategoryID(1);
//        for (Post post:
//             posts) {
//            System.out.println(post.getPost_name());
//        }
//        ImageRepository imageRepository = context.getBean(ImageRepository.class);
//        ArrayList<Image> images = imageRepository.findAllByPostID(1);
//        for(Image image: images) {
//            System.out.println(image.getImg_url());
//        }
    }
}
