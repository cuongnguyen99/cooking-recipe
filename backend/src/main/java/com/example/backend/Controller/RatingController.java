package com.example.backend.Controller;

import com.example.backend.Entity.Rating;
import com.example.backend.Service.RatingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class RatingController {
    @Autowired
    RatingService ratingService;

    @PostMapping("/rating")
    public ResponseEntity<Rating> setRating(@RequestParam String username, @RequestParam int postID, @RequestBody Rating rating) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/rating").toUriString());
        return ResponseEntity.created(uri).body(ratingService.handleRating(username, postID, rating));
    }

}
