package com.example.backend.Service;

import com.example.backend.Entity.Image;
import com.example.backend.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

//    public ArrayList<Image> getImages(int post_id) {
//        return imageRepository.findAllByPostID(post_id);
//    }
}
