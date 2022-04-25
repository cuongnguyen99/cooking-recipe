package com.example.backend.Controller;

import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("")
    public ArrayList<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user")
    public User getUser(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password
    ) {
        return userService.getUser(username, password);
    }

}
