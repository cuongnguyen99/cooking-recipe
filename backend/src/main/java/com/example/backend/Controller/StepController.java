package com.example.backend.Controller;

import com.example.backend.Entity.Step;
import com.example.backend.Service.StepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/steps")
public class StepController {
    @Autowired
    StepService stepService;

    @GetMapping("/{post_id}")
    public ArrayList<Step> getSteps(@PathVariable(name = "post_id") int post_id) {
        return stepService.getSteps(post_id);
    }
}
