package com.example.backend.Service;

import com.example.backend.Entity.Resource;
import com.example.backend.Repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;


//    public ArrayList<Resource> getResources(int post_id) {
//        return resourceRepository.findAllByPostID(post_id);
//    }
}
