package com.cotek.backend.repositories;

import com.cotek.backend.entities.Team;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

    void save(Optional<Team> team);
}