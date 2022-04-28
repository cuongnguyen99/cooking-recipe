package com.example.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String post_name;
    private String description;
    @Column(name = "category_id")
    private int categoryID;
    private String time;

    @ManyToOne
    @JoinColumn(name = "username")
    private User username;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private Collection<Image> images;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private Collection<Step> steps;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private Collection<Resource> resources;
}
