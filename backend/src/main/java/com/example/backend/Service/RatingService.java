package com.example.backend.Service;

import com.example.backend.Entity.Rating;
import com.example.backend.Repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RatingService {
    @Autowired
    RatingRepository ratingRepository;

    public Rating handleRating(String username, int postID, Rating rating) {
        Rating checkRate = ratingRepository.findByUsernameAndAndPostID(username, postID);
        if(checkRate != null) {
            log.info("Rating is exist!");
            Rating result = checkRate;
            result.setPoint(result.getPoint() + rating.getPoint());
            ratingRepository.save(result);
            return result;
        }
        else {
            ratingRepository.save(rating);
            return rating;
        }
    }
}
