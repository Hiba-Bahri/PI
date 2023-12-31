package com.cotek.backend.repositories;

import com.cotek.backend.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findByOwner_Id(Long ownerId);
}