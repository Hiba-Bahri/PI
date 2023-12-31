package com.cotek.backend.repositories;

import com.cotek.backend.entities.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository  extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
}