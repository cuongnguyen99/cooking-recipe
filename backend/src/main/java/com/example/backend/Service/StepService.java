package com.example.backend.Service;

import com.example.backend.Entity.Step;
import com.example.backend.Repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class StepService {
    @Autowired
    private StepRepository stepRepository;

//    public ArrayList<Step> getSteps(int post_id) {
//        return stepRepository.findAllByPostIDOrderByStepNumberAsc(post_id);
//    }
}
