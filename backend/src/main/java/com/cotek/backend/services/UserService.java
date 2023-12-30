package com.cotek.backend.services;

import com.cotek.backend.entities.User;
import com.cotek.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService{
    @Autowired
    private UserRepository userRepository;

    public User findUserByLogin(String login){
        return userRepository.findByLogin(login);
    }
}
