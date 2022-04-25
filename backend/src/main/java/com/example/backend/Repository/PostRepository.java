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
    ArrayList<Post> findPostByCategoryID(int categoryID);

    //Find post by id
    @Query(value = "select * from posts where posts.id = :id", nativeQuery = true)
    Post findById(@Param("id") int id);
}
