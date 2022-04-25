package com.example.backend.Repository;

import com.example.backend.Entity.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface StepRepository extends JpaRepository<Step, Integer> {

    ArrayList<Step> findAllByPostIDOrderByStepNumberAsc(int postID);

}
