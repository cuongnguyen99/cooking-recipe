package com.example.backend;

import com.example.backend.Entity.*;
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
//    CommandLineRunner run(UserService userService) {
//        return args -> {
//            userService.saveUser(new User("cuong1234", "123456", "Cuong", "abc", new ArrayList<>()));
//            userService.addRoleToUser("cuong123", "ROLE_USER");
//        };
//    }
}
