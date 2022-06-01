package com.example.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

@Data
//@NoArgsConstructor
@Entity
@RequiredArgsConstructor
@Table(name = "users")
public class User implements Serializable {
    @Id
    private String username;
    private String password;
    private String fullname;
    private String image_url;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "user_post",
        joinColumns = @JoinColumn(name = "username"),
            inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private Collection<Post> post = new ArrayList<>();
}
