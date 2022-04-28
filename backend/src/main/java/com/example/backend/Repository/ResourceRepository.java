package com.example.backend.Repository;

import com.example.backend.Entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {

//    @Query(value = "select * from resources join posts on resources.post_id = posts.id where post_id = :postID", nativeQuery = true)
//    ArrayList<Resource> findAllByPostID(@Param("postID") int postID);

}
