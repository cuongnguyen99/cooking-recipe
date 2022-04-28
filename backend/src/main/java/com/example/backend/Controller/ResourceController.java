package com.example.backend.Controller;

import com.example.backend.Entity.Resource;
import com.example.backend.Service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {
    @Autowired
    ResourceService resourceService;

//    @GetMapping("/{post_id}")
//    public ArrayList<Resource> getResources(@PathVariable(name = "post_id") int post_id) {
//        return resourceService.getResources(post_id);
//    }
}
