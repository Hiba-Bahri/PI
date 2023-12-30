package com.cotek.backend.controllers;

import com.cotek.backend.entities.User;
import com.cotek.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        System.out.println("Received user login request: " + user.getLogin());

        User storedUser = userService.findUserByLogin(user.getLogin());

        if (storedUser != null && storedUser.getPassword().equals(user.getPassword())) {
            System.out.println("Login successful for user: " + storedUser.getLogin());
            return ResponseEntity.ok(storedUser); // Return user details on successful login
        } else {
            System.out.println("Login failed for user: " + user.getLogin());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }



}
