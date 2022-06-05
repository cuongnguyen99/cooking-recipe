package com.example.backend.Controller;

import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/user/infor")
    public ResponseEntity<User> getUser(@RequestParam String username) { return ResponseEntity.ok().body(userService.getUser(username)); }

    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());

        User checkUser = userService.getUser(user.getUsername());
        if(checkUser != null)
        {
            log.error("User is exist!");
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());

        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addToleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/addfavorite")
    public ResponseEntity<?> addFavoriteList(@RequestParam String username, @RequestParam int postID) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/addfavorite").toUriString());

        return ResponseEntity.created(uri).body(userService.addFavoriteList(username, postID));
    }

    @DeleteMapping("/user/removefavorite")
    public ResponseEntity<?> removeFavoriteList(@RequestParam String username, @RequestParam int postID) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/addfavorite").toUriString());

        return ResponseEntity.created(uri).body(userService.removeFavoriteList(username, postID));
    }

    @PutMapping("/user/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/update").toUriString());

        return ResponseEntity.created(uri).body(userService.updateUser(user));
    }

    @PutMapping("user/password")
    public ResponseEntity<User> changePassword(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/password").toUriString());

        return ResponseEntity.created(uri).body(userService.changePassword(user));
    }

    @Data
    class RoleToUserForm {
        private String username;
        private String roleName;
    }
}
