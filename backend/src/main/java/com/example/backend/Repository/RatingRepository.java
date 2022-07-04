package com.example.backend.Repository;

import com.example.backend.Entity.Rating;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

    Rating findByUsernameAndAndPostID(String username, int postID);

    @Query(value = "UPDATE `heroku_9e5fe09e7330182`.`rating` SET point = :point where username= :username and post_id = :postID",
            nativeQuery = true)
    Rating updateRating(@Param("point") int point,@Param("username") String username,@Param("postID") int postID);
}
