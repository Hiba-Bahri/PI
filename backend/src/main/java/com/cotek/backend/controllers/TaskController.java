package com.cotek.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.cotek.backend.entities.Task;
import com.cotek.backend.services.TaskService;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/createTask")
    public ResponseEntity<Task> createTask(@RequestBody Task t){
        System.out.println(t);
        return taskService.createTask(t);
    }

    @GetMapping("/getAllTasks")
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/getAllTasksByProjectId/{projectId}")
    public ResponseEntity<List<Task>> getAllTasksByProjectId(@PathVariable Long projectId) {
        List<Task> tasks = taskService.getAllTasksByProjectId(projectId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/getAllTasksByMemberId/{memberId}")
    public ResponseEntity<List<Task>> getAllTasksByMemberId(@PathVariable Long memberId) {
        List<Task> tasks = taskService.getAllTasksByMemberId(memberId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/updateTask/{taskId}/Status")
    public ResponseEntity<Task> updateTaskStatus(@RequestBody String status, @PathVariable Long taskId){
        return taskService.updateTaskStatus(status,taskId);
    }

    @PutMapping("/updateTask/{id}")
    public ResponseEntity<Task> updateProject(@PathVariable Long id, @RequestBody Task editedTask){
        return taskService.updateTask(id,editedTask);
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id){
        return taskService.deleteTask(id);
    }

}