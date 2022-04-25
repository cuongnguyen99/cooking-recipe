package com.example.backend.Controller;

import com.example.backend.Entity.Category;
import com.example.backend.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("")
    public ArrayList<Category> getCategoriesList() {
        return categoryService.getAllCategories();
    }
}
