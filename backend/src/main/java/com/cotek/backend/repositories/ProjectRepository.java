package com.cotek.backend.repositories;

import com.cotek.backend.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findByOwner_Id(Long ownerId);


    @Query("SELECT p FROM Project p " +
            "JOIN p.team t " +
            "JOIN t.members m " +
            "WHERE m.role = 'project manager' AND m.login = :login")
    Project findByProjectManagerLogin(@Param("login") String login);
}