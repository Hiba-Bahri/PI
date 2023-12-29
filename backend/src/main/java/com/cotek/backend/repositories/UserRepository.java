package com.cotek.backend.repositories;

import com.cotek.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByLogin(String login);
}
