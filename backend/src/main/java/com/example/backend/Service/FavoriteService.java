package com.example.backend.Service;

import com.example.backend.Repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;
}
