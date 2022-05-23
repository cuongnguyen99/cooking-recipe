package com.example.backend;

import com.example.backend.Entity.*;
import com.example.backend.Service.PostService;
import com.example.backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
@RequiredArgsConstructor
public class App{
    public static void main(String args[]) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    CommandLineRunner run(PostService postService) {
//        return args -> {
//            ArrayList<Post> posts = postService.getPostByTime();
//            for (Post post:
//                 posts) {
//                System.out.println(post.getPost_name());
//            }
//            System.out.println();
//        };
//    }
}
