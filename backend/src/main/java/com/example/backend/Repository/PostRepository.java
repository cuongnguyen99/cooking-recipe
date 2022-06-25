package com.example.backend.Repository;

import com.example.backend.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    //Find all post by category_id
    @Query(value = "select * from posts where posts.category_id = :categoryID and posts.accepted = true;", nativeQuery = true)
    ArrayList<Post> findPostByCategoryID(@Param("categoryID") int categoryID);

    //Find post by id
    @Query(value = "select * from posts where posts.id = :id", nativeQuery = true)
    Post findById(@Param("id") int id);

    @Query(value = "select * from posts where posts.post_name like %:name% and posts.accepted = true", nativeQuery = true)
    ArrayList<Post> findPostByName(@Param("name") String post_name);

    @Query(value = "select * from posts where posts.accepted = true order by posts.time_created desc limit 0,10", nativeQuery = true)
    ArrayList<Post> findPostByTime();

    @Query(value = "select * from posts where posts.username = :username", nativeQuery = true)
    ArrayList<Post> findPostByUsername(@Param("username") String username);

    @Query(value = "select * from posts where posts.accepted = false", nativeQuery = true)
    ArrayList<Post> findPostNotAccepted();

    @Query(value = "select * from posts where posts.category_id = :categoryID order by rand() limit 4", nativeQuery = true)
    ArrayList<Post> findPostRandom(@Param("categoryID") int categoryID);
}
