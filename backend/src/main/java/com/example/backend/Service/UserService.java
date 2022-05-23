package com.example.backend.Service;

import com.example.backend.Entity.Post;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Repository.PostRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PostRepository postRepository;
//    private final PasswordEncoder passwordEncoder;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found in database");
        }
        else {
            log.info("User found in database");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRolename()));
        });
        log.info(String.valueOf(user));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    public ArrayList<User> getAllUsers() {
        log.info("Fetching all users");
        return userRepository.findAllUser();
    }

    public User getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepository.findUserByUsername(username);
    }

    public User saveUser(User user) {
        log.info("Save new user to db");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        this.addRoleToUser(user.getUsername(), "ROLE_USER");
        return user;
    }

    public Role saveRole(Role role) {
        log.info("Save new role {} to the db", role);
        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        log.info("Add role {} to user {}", roleName, username);

        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByRolename(roleName);

        user.getRoles().add(role);
    }

    public User addFavoriteList(String username, int postID) {
        User user = userRepository.findByUsername(username);
        Post post = postRepository.findById(postID);
        user.getPost().add(post);

        return user;
    }

    public User removeFavoriteList(String username, int postID) {
        User user = userRepository.findByUsername(username);
        Post post = postRepository.findById(postID);
        user.getPost().remove(post);

        return user;
    }

}
