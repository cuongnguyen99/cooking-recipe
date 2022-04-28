package com.example.backend.Controller;

import com.example.backend.Entity.Image;
import com.example.backend.Service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    ImageService imageService;

//    @GetMapping("/{post_id}")
//    public ArrayList<Image> getImages(@PathVariable(name = "post_id") int post_id) {
//        return imageService.getImages(post_id);
//    }
}
