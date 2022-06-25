package com.example.backend.Repository;

import com.example.backend.Entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Rating findByUsernameAndAndPostID(String username, int postID);
}
