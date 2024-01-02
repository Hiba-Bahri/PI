package com.cotek.backend.services;

import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cotek.backend.entities.Member;
import com.cotek.backend.entities.Task;
import com.cotek.backend.repositories.MemberRepository;
import com.cotek.backend.repositories.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ResponseEntity<Task> createTask(Task t) {
        Task createdTask = taskRepository.save(t);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getAllTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);

    }

    public ResponseEntity<Task> updateTask(Long id, Task editedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);

        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();

            if (editedTask.getDescription() != null) {
                existingTask.setDescription(editedTask.getDescription());
            }

            if (editedTask.getProgress() != null) {
                existingTask.setProgress(editedTask.getProgress());
            }

            if (editedTask.getMember() != null) {
                Member editedMember = editedTask.getMember();
                Long memberId = editedMember.getId();

                if (memberId != null) {
                    Optional<Member> optionalMember = memberRepository.findById(memberId);

                    if (optionalMember.isPresent()) {
                        Member member = optionalMember.get();
                        member.getTasks().add(existingTask);
                        existingTask.setMember(member);
                        memberRepository.save(member);
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
            }

            Task updatedTask = taskRepository.save(existingTask);
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    public ResponseEntity<String> deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            jdbcTemplate.execute("ALTER TABLE task AUTO_INCREMENT=1");
            return ResponseEntity.ok("Task with ID " + id + " has been deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}