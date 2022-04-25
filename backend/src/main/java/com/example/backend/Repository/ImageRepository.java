package com.example.backend.Repository;

import com.example.backend.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

    @Query(value = "select * from images join posts on images.post_id = posts.id where " +
            "post_id = :postID", nativeQuery = true)
    ArrayList<Image> findAllByPostID(@Param("postID") int postID);

}
