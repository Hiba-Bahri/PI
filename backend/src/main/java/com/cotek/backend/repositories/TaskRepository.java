package com.cotek.backend.repositories;

import com.cotek.backend.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository  extends JpaRepository<Task, Long> {
    
}