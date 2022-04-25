package com.example.backend.Service;

import com.example.backend.Entity.Category;
import com.example.backend.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public ArrayList<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
