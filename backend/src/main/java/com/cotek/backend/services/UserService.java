package com.cotek.backend.services;

import com.cotek.backend.entities.User;
import com.cotek.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.cotek.backend.services.MemberService.generatePassword;

@Service
public class UserService{
    @Autowired
    private UserRepository userRepository;

    public User findUserByLogin(String login){
        return userRepository.findByLogin(login);
    }

    public ResponseEntity<User> createUser(User u) {
        // Set login and password
        u.setLogin(u.getFirstName() + '_' + u.getId());
        u.setPassword(generatePassword());

        // Save the user to generate the ID
        User createdUser = userRepository.save(u);

        // Update login with the generated ID
        createdUser.setLogin(createdUser.getFirstName() + '_' + createdUser.getId());

        // Save the user again to update the login
        userRepository.save(createdUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
