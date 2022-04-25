package com.example.backend.Service;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ArrayList<User> getAllUsers() {
        return userRepository.findAllUser();
    }

    public User getUser(String username, String password) {
        return userRepository.findUserByUsernameAndPassword(username, password);
    }

}
