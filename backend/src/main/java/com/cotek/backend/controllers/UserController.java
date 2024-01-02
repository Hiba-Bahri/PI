package com.cotek.backend.controllers;

import com.cotek.backend.entities.User;
import com.cotek.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/getAllUsers")
    public List<User> getAllusers(){
        return userService.getAllUsers();
    }
}
